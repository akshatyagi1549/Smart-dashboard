// Netlify Function for OpenAI ChatGPT API integration
const { Configuration, OpenAIApi } = require('openai');

// In-memory session storage (for demo - use Redis/database in production)
const sessions = new Map();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { message, sessionId, context } = JSON.parse(event.body);

    if (!message || !sessionId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message and sessionId are required' }),
      };
    }

    // Get or create session history
    let sessionHistory = sessions.get(sessionId) || [];

    // Add system context for NGO INDIA
    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI assistant for NGO INDIA, a community platform focused on social impact, donations, volunteering, and community development programs in India. 

Key information about NGO INDIA:
- We work on education, healthcare, and rural development projects
- We accept donations through our secure platform
- We offer volunteer opportunities for Staff, Leadership, and Employee roles
- We have impacted 50,000+ lives across 150+ villages
- We have raised ₹2.5Cr+ in funds for various projects
- We run 25+ active projects including "Education for All", "Healthcare Initiative", and "Women Empowerment"

Be helpful, informative, and encouraging. Guide users toward getting involved through donations, volunteering, or learning more about our programs. Keep responses concise but comprehensive. Always maintain a warm, professional tone that reflects our mission of community empowerment.`
    };

    // Prepare messages for OpenAI
    const messages = [
      systemMessage,
      ...sessionHistory,
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantResponse = completion.data.choices[0].message.content;

    // Update session history
    sessionHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: assistantResponse }
    );

    // Keep only last 10 messages to manage memory
    if (sessionHistory.length > 20) {
      sessionHistory = sessionHistory.slice(-20);
    }

    sessions.set(sessionId, sessionHistory);

    // Clean up old sessions (older than 1 hour)
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    for (const [id, history] of sessions.entries()) {
      if (id.split('_')[1] < oneHourAgo) {
        sessions.delete(id);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: assistantResponse,
        sessionId: sessionId,
      }),
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback response for API errors
    const fallbackResponse = "I apologize, but I'm experiencing some technical difficulties right now. However, I'd be happy to help you learn about NGO INDIA! We're working on education, healthcare, and rural development across India. You can explore our donation page to support our cause or join our team as a volunteer. Is there something specific you'd like to know about our programs?";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: fallbackResponse,
        sessionId: event.body ? JSON.parse(event.body).sessionId : 'fallback',
      }),
    };
  }
};
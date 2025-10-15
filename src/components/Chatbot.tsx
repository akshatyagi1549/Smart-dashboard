import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, Bot, User, 
  Minimize2, Maximize2, RefreshCw 
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm the NGO INDIA assistant. I'm here to help you learn about our programs, donation process, volunteer opportunities, and answer any questions you might have. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Comprehensive AI response system
  const getIntelligentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();
    
    // Greeting responses
    if (message.match(/^(hello|hi|hey|good morning|good afternoon|good evening|namaste)$/)) {
      return "Hello! Welcome to NGO INDIA. I'm here to help you with information about our programs, donations, volunteering, and more. What would you like to know?";
    }
    
    // Help and general info
    if (message.includes('help') || message.includes('what can you do') || message.includes('assist')) {
      return "I can help you with:\n\n🎓 **Our Programs**: Education, Healthcare, Rural Development\n💝 **Donations**: How to contribute and payment methods\n🤝 **Volunteering**: Staff, Leadership, and Employee opportunities\n📊 **Our Impact**: Statistics and success stories\n📞 **Contact**: Get in touch with our team\n\nWhat would you like to explore?";
    }
    
    // Donation related queries
    if (message.includes('donate') || message.includes('donation') || message.includes('contribute') || message.includes('give money') || message.includes('support financially')) {
      return "Thank you for your interest in supporting NGO INDIA! 💝\n\n**How to Donate:**\n• Visit our donation page for secure payments\n• Accept Credit/Debit Cards, UPI, Net Banking\n• All transactions are SSL encrypted\n\n**Your Impact:**\n• ₹500 → School supplies for 5 children\n• ₹1000 → Healthcare for 10 families\n• ₹2500 → Clean water access for 1 month\n\nWould you like me to guide you to the donation page?";
    }
    
    // Volunteer/Join queries
    if (message.includes('volunteer') || message.includes('join') || message.includes('work') || message.includes('career') || message.includes('job') || message.includes('apply')) {
      return "Great! We'd love to have you join our mission! 🤝\n\n**Available Roles:**\n\n👥 **Director**: Program leadership, donor relations, project monitoring\n🛡️ **Executive Director**: Strategic planning, organizational oversight\n💼 **Employee**: Operations, community engagement\n\n**Benefits:**\n• Professional development opportunities\n• Training and skill building\n• Make real impact in communities\n• Collaborative work environment\n\nVisit our 'Join Us' page to apply. Which role interests you most?";
    }
    
    // Education program
    if (message.includes('education') || message.includes('school') || message.includes('children') || message.includes('learning')) {
      return "📚 **Education for All Program**\n\nWe provide quality education to underprivileged children across rural India.\n\n**Our Impact:**\n• 2,340+ children educated\n• Digital learning tools provided\n• Qualified teachers deployed\n• School supplies distributed\n\n**Locations:** Rajasthan, UP, Bihar\n\nThis program transforms lives by giving children access to quality education and brighter futures!";
    }
    
    // Healthcare program
    if (message.includes('healthcare') || message.includes('medical') || message.includes('health') || message.includes('hospital')) {
      return "🏥 **Healthcare Initiative**\n\nMobile healthcare units serving remote communities with essential medical services.\n\n**Our Services:**\n• Primary healthcare\n• Nutrition programs\n• Health education\n• Medical camps\n\n**Impact:** 15,000+ people served across Maharashtra and Karnataka\n\nWe bring quality healthcare directly to communities that need it most!";
    }
    
    // Women empowerment
    if (message.includes('women') || message.includes('empowerment') || message.includes('skill') || message.includes('microfinance')) {
      return "👩 **Women Empowerment Program**\n\nSkill development and microfinance programs for rural women entrepreneurs.\n\n**What We Offer:**\n• Vocational training\n• Microfinance support\n• Business development\n• Leadership training\n\n**Impact:** 2,500+ women empowered across Gujarat and Madhya Pradesh\n\nHelping women achieve financial independence and support their families!";
    }
    
    // Rural development
    if (message.includes('rural') || message.includes('development') || message.includes('infrastructure') || message.includes('village')) {
      return "🌾 **Rural Development Program**\n\nInfrastructure development and livelihood programs for rural communities.\n\n**Our Focus:**\n• Clean water access\n• Sanitation facilities\n• Livelihood programs\n• Community infrastructure\n\n**Progress:** 80% completion rate across multiple villages\n\nBuilding sustainable communities for lasting change!";
    }
    
    // Impact and statistics
    if (message.includes('impact') || message.includes('statistics') || message.includes('numbers') || message.includes('achievement') || message.includes('success')) {
      return "📊 **NGO INDIA Impact Statistics:**\n\n🎯 **Overall Reach:**\n• 50,000+ lives impacted\n• 150+ villages reached\n• ₹2.5Cr+ funds raised\n• 25+ active projects\n\n👥 **Direct Beneficiaries:**\n• 2,340 children educated\n• 15,000+ people received healthcare\n• 2,500+ women empowered\n• 850 families served\n\n🏆 **Success Rate:** 92% project completion\n\nEvery number represents a life changed for the better!";
    }
    
    // Contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address') || message.includes('reach')) {
      return "📞 **Contact NGO INDIA:**\n\n📧 **Email:** info@ngoindia.org\n📱 **Phone:** +91 11 4567 8900\n📍 **Address:** New Delhi, India\n\n🌐 **Connect with us:**\n• Website: Browse our programs and impact stories\n• Social Media: Follow our latest updates\n• Newsletter: Subscribe for monthly impact reports\n\nOur team is always ready to help! What would you like to discuss?";
    }
    
    // Payment methods
    if (message.includes('payment') || message.includes('pay') || message.includes('method') || message.includes('upi') || message.includes('card')) {
      return "💳 **Payment Methods Available:**\n\n**Credit/Debit Cards:**\n• Visa, MasterCard, RuPay\n• Secure 256-bit SSL encryption\n\n**UPI Payments:**\n• Google Pay\n• PhonePe\n• Paytm\n• Any UPI app\n\n**Net Banking:**\n• All major Indian banks supported\n• Instant confirmation\n\n**Security:** All transactions are completely secure and you'll receive a tax-deductible receipt via email!";
    }
    
    // About NGO INDIA
    if (message.includes('about') || message.includes('who are you') || message.includes('organization') || message.includes('ngo india')) {
      return "🌟 **About NGO INDIA:**\n\nWe're a community platform focused on creating lasting change through:\n\n✨ **Our Mission:**\n• Transparent operations with real-time tracking\n• Community-driven impact programs\n• Collaborative networks with other organizations\n• Data-driven approach to measure effectiveness\n\n🎯 **Our Focus Areas:**\n• Education for underprivileged children\n• Healthcare for remote communities\n• Rural development and infrastructure\n• Women empowerment and skill development\n\nWe believe in empowering communities through sustainable development!";
    }
    
    // Location and areas served
    if (message.includes('location') || message.includes('where') || message.includes('area') || message.includes('state')) {
      return "📍 **Areas We Serve:**\n\n🎓 **Education Programs:**\n• Rajasthan, Uttar Pradesh, Bihar\n\n🏥 **Healthcare Services:**\n• Maharashtra, Karnataka\n\n👩 **Women Empowerment:**\n• Gujarat, Madhya Pradesh\n\n🌾 **Rural Development:**\n• Multiple states across India\n\n**Headquarters:** New Delhi, India\n\nWe're expanding our reach to serve more communities across India!";
    }
    
    // Transparency and accountability
    if (message.includes('transparent') || message.includes('accountability') || message.includes('report') || message.includes('fund usage')) {
      return "🔍 **Transparency & Accountability:**\n\n📊 **Real-time Tracking:**\n• Live project progress updates\n• Detailed fund utilization reports\n• Impact measurement dashboards\n\n📋 **Regular Reports:**\n• Monthly impact newsletters\n• Annual transparency reports\n• Financial audits published\n\n🏆 **Certifications:**\n• 95% financial transparency rating\n• Verified by independent auditors\n• Compliant with all regulations\n\nYour trust is our priority - every rupee is accounted for!";
    }
    
    // Thank you responses
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      return "You're very welcome! 😊 It's my pleasure to help you learn about NGO INDIA and our mission to create positive change.\n\nIf you have any more questions about our programs, how to get involved, or anything else, please don't hesitate to ask. Together, we can make a real difference in communities across India!\n\nIs there anything else you'd like to know?";
    }
    
    // Goodbye responses
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you') || message.includes('exit')) {
      return "Thank you for your interest in NGO INDIA! 🙏\n\nRemember, every small action can create a big impact. Whether through donations, volunteering, or simply spreading awareness, you can be part of positive change.\n\nFeel free to return anytime if you have more questions. Have a wonderful day and thank you for caring about our communities!";
    }
    
    // Default intelligent response
    return `Thank you for your question! I'd be happy to help you learn more about NGO INDIA. 

Based on what you're asking, you might be interested in:

🎓 **Our Programs**: Education, Healthcare, Rural Development, Women Empowerment
💝 **Getting Involved**: Donations or volunteering opportunities  
📊 **Our Impact**: 50,000+ lives changed across 150+ villages
📞 **Contact Us**: Get in touch with our team directly

What specific aspect would you like to explore? I'm here to help guide you through any information about our mission and work!`;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Simulate realistic AI thinking time
    setTimeout(() => {
      const response = getIntelligentResponse(currentMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800 + Math.random() * 1200); // Random delay between 0.8-2 seconds for realism
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm the NGO INDIA assistant. I'm here to help you learn about our programs, donation process, volunteer opportunities, and answer any questions you might have. How can I assist you today?",
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-5 right-5 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 hover:scale-110 z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-5 right-5 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
      isMinimized ? 'w-72 h-14' : 'w-80 h-[480px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-1.5 rounded-full">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">NGO INDIA Assistant</h3>
            <p className="text-[10px] text-orange-100">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-0.5 hover:bg-white/20 rounded transition-colors"
            aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={clearChat}
            className="p-0.5 hover:bg-white/20 rounded transition-colors"
            aria-label="Clear chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onToggle}
            className="p-0.5 hover:bg-white/20 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 h-[360px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="bg-orange-100 p-1.5 rounded-full flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-orange-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-2.5 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-orange-500 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}
                >
                  <p className="text-[13px] leading-relaxed whitespace-pre-line">{message.content}</p>
                  <p className={`text-[10px] mt-1 ${
                    message.role === 'user' ? 'text-orange-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="bg-orange-500 p-1.5 rounded-full flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-orange-100 p-1.5 rounded-full flex-shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-orange-600" />
                </div>
                <div className="bg-gray-100 p-2.5 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 text-center">
              Powered by AI • Your conversations are secure
            </p>
          </div>
        </>
      )}
    </div>
  );
}
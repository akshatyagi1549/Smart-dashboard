import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Video, Paperclip, Mic, Send, MapPin, Image as ImgIcon, PhoneOff } from 'lucide-react';

interface Message {
  id: string;
  text?: string;
  fileUrl?: string;
  audioUrl?: string;
  location?: { lat: number; lng: number; name: string };
  timestamp: number;
  sender: 'me' | 'them';
}

export function WhatsAppCommunication() {
  const ngoId = new URLSearchParams(window.location.search).get('ngo') || '1';
  const ngoName = new URLSearchParams(window.location.search).get('name') || 'Green Future Trust';
  
  const [chatHistories, setChatHistories] = useState<Record<string, Message[]>>({});
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const messages = chatHistories[ngoId] || [];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (payload: Partial<Message>) => {
    const message: Message = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      sender: "me",
      ...payload
    } as Message;
    setChatHistories(prev => ({
      ...prev,
      [ngoId]: [...(prev[ngoId] || []), message]
    }));
    setInput("");
    scrollToBottom();
    
    // Auto-reply from NGO
    setTimeout(() => {
      const replies = [
        "Hello! Thanks for reaching out to us.",
        "Hi there! How can we help you today?",
        "Thank you for your message. We'll get back to you soon.",
        "Great to hear from you! What would you like to know?",
        "Hello! We're excited to collaborate with you."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMessage: Message = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
        sender: "them",
        text: randomReply
      };
      
      setChatHistories(prev => ({
        ...prev,
        [ngoId]: [...(prev[ngoId] || []), replyMessage]
      }));
    }, 1000 + Math.random() * 2000);
  };

  const uploadFile = async (file: File): Promise<string> => {
    return URL.createObjectURL(file);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    sendMessage({ fileUrl: url, text: file.name });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (ev) => {
        if (ev.data.size > 0) chunksRef.current.push(ev.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const file = new File([blob], `voice-${Date.now()}.webm`, { type: blob.type });
        const url = await uploadFile(file);
        sendMessage({ audioUrl: url, text: "Voice message" });
        stream.getTracks().forEach(t => t.stop());
      };
      
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const startCall = async (video = false) => {
    try {
      setCallType(video ? 'video' : 'audio');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: video 
      });
      
      setLocalStream(stream);
      setInCall(true);
      
      if (localVideoRef.current && video) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Simulate remote stream after 2 seconds
      setTimeout(async () => {
        try {
          const remoteStream = await navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: video 
          });
          setRemoteStream(remoteStream);
          
          if (remoteVideoRef.current && video) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        } catch (error) {
          console.error('Error accessing remote media:', error);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Unable to access camera/microphone. Please check permissions.');
    }
  };
  
  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }
    setInCall(false);
    setCallType(null);
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: "Current Location"
        };
        sendMessage({ location, text: "📍 Location shared" });
      });
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              localStorage.setItem('activeModule', 'collaboration');
              window.location.href = '/';
            }}
            className="p-2 hover:bg-orange-600 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">{ngoName.charAt(0)}</span>
            </div>
            <div>
              <div className="font-semibold text-lg">{ngoName}</div>
              <div className="text-sm opacity-90">Online</div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => startCall(false)} className="p-3 hover:bg-orange-600 rounded-lg">
            <Phone className="w-6 h-6" />
          </button>
          <button onClick={() => startCall(true)} className="p-3 hover:bg-orange-600 rounded-lg">
            <Video className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Call overlay */}
      {inCall && (
        <div className="fixed inset-0 bg-gray-900 flex flex-col text-white z-50">
          <div className="flex-1 relative">
            {callType === 'video' ? (
              <div className="h-full flex flex-col">
                {/* Remote video */}
                <div className="flex-1 relative">
                  <video 
                    ref={remoteVideoRef}
                    autoPlay 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 text-white font-semibold text-xl">
                    {ngoName}
                  </div>
                </div>
                
                {/* Local video (small overlay) */}
                <div className="absolute top-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden">
                  <video 
                    ref={localVideoRef}
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-16 h-16" />
                  </div>
                  <div className="text-2xl font-semibold mb-4">Audio call with {ngoName}</div>
                  <div className="text-lg opacity-75">Connected</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Call controls */}
          <div className="p-6 flex justify-center">
            <button 
              onClick={endCall}
              className="bg-red-500 hover:bg-red-600 p-4 rounded-full"
            >
              <PhoneOff className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'me' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white text-gray-900 border'
              }`}>
                {message.text && <p>{message.text}</p>}
                {message.fileUrl && (
                  <div className="mt-2">
                    <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">
                      📎 {message.text}
                    </a>
                  </div>
                )}
                {message.audioUrl && (
                  <div className="mt-2">
                    <audio controls className="w-full">
                      <source src={message.audioUrl} type="audio/webm" />
                    </audio>
                  </div>
                )}
                {message.location && (
                  <div className="mt-2">
                    <p>📍 {message.location.name}</p>
                    <p className="text-xs opacity-75">
                      Lat: {message.location.lat.toFixed(6)}, Lng: {message.location.lng.toFixed(6)}
                    </p>
                  </div>
                )}
                <div className="text-xs opacity-75 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <div className="flex items-center gap-3">
            <input
              type="file"
              onChange={onFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer">
              <Paperclip className="w-6 h-6" />
            </label>
            
            <button onClick={shareLocation} className="p-2 text-gray-500 hover:text-gray-700">
              <MapPin className="w-6 h-6" />
            </button>

            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && input.trim() && sendMessage({ text: input })}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              {input.trim() ? (
                <button 
                  onClick={() => sendMessage({ text: input })}
                  className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                >
                  <Send className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onMouseLeave={stopRecording}
                  className={`p-2 rounded-full ${recording ? 'bg-red-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppCommunication;
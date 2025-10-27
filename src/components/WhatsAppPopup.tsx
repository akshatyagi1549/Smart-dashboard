import React, { useState, useRef, useEffect } from 'react';
import { X, Phone, Video, Paperclip, Mic, Send, MapPin, Image as ImgIcon, PhoneOff } from 'lucide-react';

interface Message {
  id: string;
  text?: string;
  fileUrl?: string;
  audioUrl?: string;
  location?: { lat: number; lng: number; name: string };
  timestamp: number;
  sender: 'me' | 'them';
}

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  ngo: {
    id: string;
    name: string;
    avatar: string;
  };
}

export function WhatsAppPopup({ isOpen, onClose, ngo }: WhatsAppPopupProps) {
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

  const messages = ngo ? (chatHistories[ngo.id] || []) : [];

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (payload: Partial<Message>) => {
    if (!ngo) return;
    const message: Message = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      sender: "me",
      ...payload
    } as Message;
    setChatHistories(prev => ({
      ...prev,
      [ngo.id]: [...(prev[ngo.id] || []), message]
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
        [ngo.id]: [...(prev[ngo.id] || []), replyMessage]
      }));
    }, 1000 + Math.random() * 2000);
  };

  const uploadFile = async (file: File): Promise<string> => {
    // Simulate file upload - replace with actual upload logic
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

  if (!isOpen || !ngo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-96 h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-green-500 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <img src={ngo.avatar} alt={ngo.name} className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-semibold">{ngo.name}</div>
              <div className="text-xs opacity-90">Online</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => startCall(false)} className="p-2 hover:bg-green-600 rounded">
              <Phone className="w-5 h-5" />
            </button>
            <button onClick={() => startCall(true)} className="p-2 hover:bg-green-600 rounded">
              <Video className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-green-600 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Call overlay */}
        {inCall && (
          <div className="absolute inset-0 bg-gray-900 flex flex-col text-white rounded-lg">
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
                    <div className="absolute top-4 left-4 text-white font-semibold">
                      {ngo.name}
                    </div>
                  </div>
                  
                  {/* Local video (small overlay) */}
                  <div className="absolute top-4 right-4 w-32 h-24 bg-black rounded-lg overflow-hidden">
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
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-12 h-12" />
                    </div>
                    <div className="text-xl font-semibold mb-2">Audio call with {ngo.name}</div>
                    <div className="text-sm opacity-75">Connected</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Call controls */}
            <div className="p-4 flex justify-center">
              <button 
                onClick={endCall}
                className="bg-red-500 p-4 rounded-full hover:bg-red-600 transition-colors"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((m) => (
            <div key={m.id} className={`mb-4 flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`${
                m.sender === "me" 
                  ? "bg-green-500 text-white" 
                  : "bg-white text-black"
              } p-3 rounded-lg shadow max-w-xs`}>
                {m.text && <div className="mb-1">{m.text}</div>}
                {m.fileUrl && (
                  <div className="mb-1">
                    <a href={m.fileUrl} target="_blank" rel="noreferrer" className="underline text-sm">
                      📎 {m.fileUrl.split("/").pop()}
                    </a>
                  </div>
                )}
                {m.audioUrl && (
                  <audio controls src={m.audioUrl} className="mt-2 w-full" />
                )}
                {m.location && (
                  <div className="mb-1">
                    <div className="text-sm">📍 {m.location.name}</div>
                    <div className="text-xs opacity-75">
                      {m.location.lat.toFixed(4)}, {m.location.lng.toFixed(4)}
                    </div>
                  </div>
                )}
                <div className="text-xs opacity-75 mt-2 text-right">
                  {new Date(m.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t flex items-center gap-2">
          <label className="cursor-pointer p-2 hover:bg-gray-100 rounded">
            <Paperclip className="w-5 h-5 text-gray-500" />
            <input type="file" className="hidden" onChange={onFileChange} />
          </label>
          
          <label className="cursor-pointer p-2 hover:bg-gray-100 rounded">
            <ImgIcon className="w-5 h-5 text-gray-500" />
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </label>

          <button 
            onClick={shareLocation}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <MapPin className="w-5 h-5 text-gray-500" />
          </button>

          {recording ? (
            <button 
              onClick={stopRecording} 
              className="px-3 py-2 bg-red-500 text-white rounded text-sm"
            >
              Stop
            </button>
          ) : (
            <button 
              onClick={startRecording} 
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Mic className="w-5 h-5 text-gray-500" />
            </button>
          )}

          <input
            className="flex-1 border px-3 py-2 rounded-full"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) sendMessage({ text: input });
              }
            }}
          />
          
          <button 
            onClick={() => input.trim() && sendMessage({ text: input })} 
            className="p-2 text-green-600 hover:bg-green-50 rounded"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { ArrowLeft, Send, Paperclip, Mic, Phone, Video, Image as ImgIcon } from "lucide-react";

const SERVER_URL = "http://localhost:5000";

type Message = {
  id: string;
  text?: string;
  from?: string;
  fileUrl?: string;
  audioUrl?: string;
  timestamp?: number;
  sender: "me" | "ngo";
};

export function WhatsAppChat() {
  const { ngoId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const ngo = (location.state as any)?.ngo || { id: ngoId, name: "Partner NGO" };

  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // WebRTC related
  const localStreamRef = useRef<MediaStream | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [inCall, setInCall] = useState(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // connect socket
    const s = io(SERVER_URL);
    setSocket(s);

    s.on("connect", () => {
      const roomId = `chat-${ngoId}`;
      s.emit("joinRoom", { roomId, user: { id: "me", name: "Me" } });
    });

    s.on("receiveMessage", ({ message }: { message: Message }) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    s.on(
      "webrtc-offer",
      async ({
        offer,
        from,
        meta,
      }: {
        offer: RTCSessionDescriptionInit;
        from?: any;
        meta?: any;
      }) => {
        // create peer, set remote, create answer
        if (!pcRef.current) await createPeerConnection();
        await pcRef.current!.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pcRef.current!.createAnswer();
        await pcRef.current!.setLocalDescription(answer);
        s.emit("webrtc-answer", { roomId: `chat-${ngoId}`, answer });
      }
    );

    s.on("webrtc-answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      if (pcRef.current && answer) {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    s.on("webrtc-ice-candidate", ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      if (pcRef.current && candidate) {
        pcRef.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
      }
    });

    return () => {
      s.disconnect();
      setSocket(null);
      if (pcRef.current) pcRef.current.close();
    };
  }, [ngoId]);

  useEffect(() => scrollToBottom(), [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (payload: Partial<Message>) => {
    if (!socket) return;
    const message: Message = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      sender: "me",
      ...payload
    } as Message;
    setMessages(m => [...m, message]);
    socket.emit("sendMessage", { roomId: `chat-${ngoId}`, message });
    setInput("");
    scrollToBottom();
  };

  // file upload helper
  const uploadFile = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${SERVER_URL}/upload`, { method: "POST", body: fd });
    const data = await res.json();
    return data.url as string;
  };

  // handle file input
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    sendMessage({ fileUrl: url, text: file.name });
  };

  // voice recording
  const startRecording = async () => {
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
      // stop tracks
      stream.getTracks().forEach(t => t.stop());
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // WebRTC — create peer connection and set handlers
  const createPeerConnection = async () => {
    pcRef.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" } // for dev; add TURN in prod
      ]
    });
    pcRef.current.onicecandidate = (e) => {
      if (e.candidate) socket?.emit("webrtc-ice-candidate", { roomId: `chat-${ngoId}`, candidate: e.candidate });
    };
    pcRef.current.ontrack = (e) => {
      // attach remote stream to audio/video element
      const [stream] = e.streams;
      setRemoteStream(stream);
    };
    // local stream will be added when initiating call
    return pcRef.current;
  };

  const startCall = async (video = false) => {
    if (!socket) return;
    // get local media
    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video });
    localStreamRef.current = localStream;
    if (!pcRef.current) await createPeerConnection();
    // add tracks
    localStream.getTracks().forEach(track => pcRef.current!.addTrack(track, localStream));
    // create offer
    const offer = await pcRef.current!.createOffer();
    await pcRef.current!.setLocalDescription(offer);
    socket.emit("webrtc-offer", { roomId: `chat-${ngoId}`, offer, from: { id: "me", name: "Me" } });
    setInCall(true);
  };

  const endCall = () => {
    if (pcRef.current) {
      pcRef.current.getSenders().forEach(s => s.track?.stop());
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
    setRemoteStream(null);
    setInCall(false);
  };

  // sample UI message list includes support for fileUrl/audioUrl
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* header */}
      <div className="flex items-center justify-between p-4 border-b bg-orange-500 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-orange-600 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="font-semibold text-lg">{ngo.name}</div>
            <div className="text-xs text-orange-100">Online</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => startCall(false)} className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button onClick={() => startCall(true)} className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-orange-25 to-white">
        {messages.map((m) => (
          <div key={m.id} className={`mb-4 flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`${m.sender === "me" ? "bg-orange-500 text-white" : "bg-white text-gray-800 border border-orange-200"} p-3 rounded-lg shadow-md max-w-md`}>
              {m.text && <div className="mb-1">{m.text}</div>}
              {m.fileUrl && (
                <div className="mb-1">
                  <a href={m.fileUrl} target="_blank" rel="noreferrer" className="underline text-sm hover:text-orange-300">
                    {m.fileUrl.split("/").pop()}
                  </a>
                </div>
              )}
              {m.audioUrl && (
                <audio controls src={m.audioUrl} className="mt-2" />
              )}
              <div className={`text-xs mt-2 text-right ${m.sender === "me" ? "text-orange-100" : "text-gray-500"}`}>
                {new Date(m.timestamp || 0).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* call remote video (if any) */}
      {remoteStream && (
        <div className="p-4 bg-orange-100 border-t border-orange-200">
          <video
            ref={el => {
              if (el && remoteStream) {
                el.srcObject = remoteStream;
              }
            }}
            controls
            autoPlay
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* input area */}
      <div className="p-4 bg-white border-t border-orange-200 flex items-center gap-3">
        <label className="cursor-pointer p-2 hover:bg-orange-100 rounded-lg transition-colors">
          <Paperclip className="w-5 h-5 text-orange-600" />
          <input type="file" className="hidden" onChange={onFileChange} />
        </label>
        <label className="cursor-pointer p-2 hover:bg-orange-100 rounded-lg transition-colors">
          <ImgIcon className="w-5 h-5 text-orange-600" />
          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </label>

        {recording ? (
          <button onClick={stopRecording} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Stop
          </button>
        ) : (
          <button onClick={startRecording} className="p-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors">
            <Mic className="w-5 h-5 text-orange-600" />
          </button>
        )}

        <input
          className="flex-1 border border-orange-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (input.trim()) sendMessage({ text: input }); } }}
        />
        <button 
          onClick={() => input.trim() && sendMessage({ text: input })} 
          className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}

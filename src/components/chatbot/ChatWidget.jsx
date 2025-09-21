import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm WinterAI. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const messagesEndRef = useRef(null);

  // Sound effects
  const sendSound = new Audio("./assets/audio/sent-message.mp3");
  const receiveSound = new Audio("./assets/audio/receive-message.mp3");
  sendSound.volume = 0.4;
  receiveSound.volume = 0.3;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleOpen = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim() || cooldown) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    sendSound.play();
    setCooldown(true);

    try {
      const res = await fetch("http://localhost:4000/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "No response." },
      ]);
      receiveSound.play();
    } catch (err) {
      console.error("❌ Chat error:", err.message);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops! Failed to reach WinterAI backend." },
      ]);
    }

    setTimeout(() => setCooldown(false), 500);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!cooldown) sendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([{ from: "bot", text: "Hi! I'm WinterAI. How can I help you?" }]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-5 right-5 bg-[#1c1c1e] border border-[#3a3a3c] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 hover:bg-[#2c2c2e] transition"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h8m-8 4h6" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-20 right-5 w-80 max-h-[450px] bg-[#1c1c1e] border border-white text-white rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#2c2c2e] py-3 px-4 font-semibold flex items-center justify-between border-b border-[#3a3a3c]">
              <div className="flex items-center space-x-2">
                <img
                  src="./assets/images/logos/robot.png"
                  alt="WinterAI Avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>WinterAI</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={resetConversation}
                  className="text-sm text-gray-300 hover:text-white transition"
                  title="Reset conversation"
                >
                  Reset
                </button>
                <button onClick={toggleOpen} title="Close chat">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 chat-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.from === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                        msg.from === "user"
                          ? "bg-[#0a84ff] text-white"
                          : "bg-[#2c2c2e] text-gray-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-[#2c2c2e] border-t border-[#3a3a3c] px-3 py-2 flex items-center space-x-2">
              <textarea
                rows={1}
                className="flex-grow resize-none bg-[#1c1c1e] border border-[#3a3a3c] rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a84ff]"
                placeholder="Message WinterAI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={cooldown}
              />
              <button
                onClick={sendMessage}
                disabled={cooldown}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  cooldown
                    ? "bg-gray-600 cursor-not-allowed text-white"
                    : "bg-[#0a84ff] hover:bg-[#006be1] text-white"
                }`}
                aria-label="Send"
              >
                {cooldown ? "Send" : "Send"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

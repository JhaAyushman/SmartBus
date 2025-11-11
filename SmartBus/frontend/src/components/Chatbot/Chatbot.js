import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { FaTimes, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello 👋 I'm your Bus Booking Assistant. How can I help you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

    useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    }, [messages]);

  const keywordResponses = {
    routes: {
      keywords: ["route", "destination", "where", "city"],
      response:
        "We operate on major routes like Delhi ↔ Bangalore, Mumbai ↔ Pune, and Hyderabad ↔ Chennai.",
    },
    price: {
      keywords: ["price", "fare", "cost"],
      response:
        "Bus fares depend on route and class: Economy ₹500–₹1000, Premium ₹1000–₹1500, Luxury ₹1500–₹2500.",
    },
    contact: {
      keywords: ["contact", "support", "help"],
      response:
        "📞 You can reach us at 1-800-SMARTBUS or email support@smartbus.com.",
    },
  };

  const findRuleResponse = (text) => {
    const lower = text.toLowerCase();
    for (const cat of Object.values(keywordResponses)) {
      if (cat.keywords.some((k) => lower.includes(k))) {
        return cat.response;
      }
    }
    return null;
  };

  const callSambaNova = async (prompt) => {
    try {
      const res = await fetch("https://api.sambanova.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_SN_API_KEY}`,
        },
        body: JSON.stringify({
          model: "DeepSeek-V3-0324",
          messages: [
            { role: "system", content: "You are a friendly and helpful bus booking assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.3,
          top_p: 0.9,
        }),
      });

      const data = await res.json();
      return data?.choices?.[0]?.message?.content || "Sorry, I didn’t understand that.";
    } catch (err) {
      console.error("SambaNova API error:", err);
      return "⚠️ I’m having trouble connecting to my AI engine. Please try again later.";
    }
  };

  // === Combined Bot Logic ===
  const getBotResponse = async (text) => {
    const ruleAnswer = findRuleResponse(text);
    if (ruleAnswer) return ruleAnswer;

    // If no keyword match → use AI
    return await callSambaNova(text);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const botText = await getBotResponse(inputValue);
    const botMsg = {
      id: Date.now() + 1,
      text: botText,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((m) => [...m, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <button
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Bus Assistant</h3>
            <p>Powered by SambaNova AI 🧠</p>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`message ${
                  m.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-avatar">
                  {m.sender === "user" ? <FaUser /> : <FaRobot />}
                </div>
                <div className="message-content">
                  <div className="message-text">{m.text}</div>
                  <div className="message-time">
                    {m.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot-message">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
            />
            <button
              onClick={handleSendMessage}
              className="send-button"
              disabled={!inputValue.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

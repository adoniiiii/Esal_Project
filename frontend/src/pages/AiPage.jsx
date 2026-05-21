import { useState } from "react";
import { chatbot } from "../services/api";

const AiPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const data = await chatbot.sendMessage(question);
      setAnswer(data.reply || data.message || "No response from AI");
    } catch (err) {
      setError(err.message || "Failed to get response from AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <h1>🤖 AI Travel Assistant</h1>
      <p>Ask me about yurts, jailoos, and trips in Kyrgyzstan!</p>
      <div className="chat-box">
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAsk()}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
      {error && <div className="auth-error">{error}</div>}
      {answer && <div className="ai-answer">{answer}</div>}
    </div>
  );
};

export default AiPage;

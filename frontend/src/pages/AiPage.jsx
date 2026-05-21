import { useState } from "react";

const AiPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = () => {
    setAnswer(
      `Answer to "${question}" will be shown here. This is a mock AI assistant.`,
    );
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
        />
        <button onClick={handleAsk}>Ask</button>
      </div>
      {answer && <div className="ai-answer">{answer}</div>}
    </div>
  );
};

export default AiPage;

import { useState, useRef, useEffect } from "react";
import BookingModal from "../components/BookingModal";

const renderText = (text) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => (j % 2 === 1 ? <strong key={j}>{p}</strong> : p))}
        <br />
      </span>
    );
  });
};

const YurtCard = ({ yurt, onBook }) => {
  const price = yurt.price;
  const image = yurt.photo_url || "https://placehold.co/400x220?text=Yurt";
  const location = yurt.region_name || "Kyrgyzstan";

  return (
    <div style={{
      display: "flex", gap: "1rem", background: "white",
      borderRadius: "16px", overflow: "hidden",
      boxShadow: "0 4px 20px rgba(26,92,58,0.10)",
      border: "1px solid rgba(200,224,200,0.7)",
      marginTop: "0.75rem",
    }}>
      <img src={image} alt={yurt.name} style={{ width: "110px", height: "100px", objectFit: "cover", flexShrink: 0 }} />
      <div style={{ padding: "0.75rem 0.75rem 0.75rem 0", flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--mtn)", marginBottom: "0.15rem" }}>
          {yurt.name}
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--meadow)", marginBottom: "0.45rem" }}>
          📍 {location} &nbsp;·&nbsp; 👥 до {yurt.capacity} чел.
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--mtn)", fontSize: "0.95rem" }}>
            {price?.toLocaleString()} <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 400, color: "var(--leaf)" }}>сом/ночь</span>
          </span>
          <button
            onClick={() => onBook(yurt)}
            style={{
              background: "var(--forest)", color: "var(--cream)", border: "none",
              padding: "0.35rem 0.9rem", borderRadius: "99px", fontSize: "0.74rem",
              fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)"
            }}
          >
            Забронировать →
          </button>
        </div>
      </div>
    </div>
  );
};

const Message = ({ msg, onBook }) => {
  const isUser = msg.role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: "1rem" }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: "var(--mtn)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", flexShrink: 0, marginRight: "0.6rem", marginTop: "2px"
        }}>🏔️</div>
      )}
      <div style={{ maxWidth: "78%" }}>
        <div style={{
          background: isUser ? "var(--mtn)" : "white",
          color: isUser ? "var(--cream)" : "var(--mtn)",
          padding: "0.8rem 1.1rem",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          boxShadow: "0 2px 12px rgba(26,92,58,0.09)",
          fontSize: "0.9rem", lineHeight: 1.65,
          border: isUser ? "none" : "1px solid rgba(200,224,200,0.6)"
        }}>
          {renderText(msg.content)}
        </div>
        {msg.yurts && msg.yurts.length > 0 && (
          <div>{msg.yurts.map(y => <YurtCard key={y.id} yurt={y} onBook={onBook} />)}</div>
        )}
      </div>
    </div>
  );
};

const AiPage = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Саламатсызбы! 👋 Я ваш помощник по путешествиям на платформе Es Al. Расскажите — куда хотите поехать, сколько человек, какой бюджет? Помогу подобрать идеальную юрту! 🏔️"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingYurt, setBookingYurt] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const history = newMessages
        .slice(1)
        .slice(0, -1)
        .map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch("http://localhost:5000/api/chatbot/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ message: userText, history })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server error");

      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.reply,
        yurts: data.recommended_yurts || []
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Что-то пошло не так. Попробуйте ещё раз. 🙏"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Юрта на Сон-Куле для 2 человек",
    "Дешевле 3000 сом/ночь",
    "Что взять с собой в горы?",
    "Лучший сезон для поездки?",
  ];

  return (
    <div style={{
      maxWidth: 700, margin: "0 auto", padding: "1.5rem 1rem",
      display: "flex", flexDirection: "column", height: "calc(100vh - 60px)"
    }}>
      <div style={{ textAlign: "center", marginBottom: "1rem", flexShrink: 0 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 700, color: "var(--mtn)", marginBottom: "0.2rem" }}>
          🏔️ AI Помощник
        </h1>
        <p style={{ color: "var(--meadow)", fontSize: "0.85rem" }}>
          Опишите что хотите — подберу юрту и отвечу на любые вопросы
        </p>
      </div>

      <div style={{
        flex: 1, overflowY: "auto", padding: "1rem",
        background: "var(--warm)", borderRadius: "20px",
        border: "1px solid rgba(200,224,200,0.6)", marginBottom: "1rem"
      }}>
        {messages.map((msg, i) => <Message key={i} msg={msg} onBook={setBookingYurt} />)}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--meadow)", fontSize: "0.85rem", paddingLeft: "2.6rem" }}>
            <div style={{ display: "flex", gap: "3px" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: "50%", background: "var(--meadow)",
                  animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite`
                }} />
              ))}
            </div>
            Думаю...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem", flexShrink: 0 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{
              background: "white", border: "1.5px solid var(--sand)", borderRadius: "99px",
              padding: "0.4rem 0.9rem", fontSize: "0.8rem", color: "var(--mtn)",
              cursor: "pointer", fontFamily: "var(--font-body)"
            }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{
        display: "flex", gap: "0.5rem", background: "white",
        border: "1.5px solid var(--sand)", borderRadius: "99px",
        padding: "0.4rem 0.4rem 0.4rem 1.25rem",
        boxShadow: "0 4px 20px rgba(26,92,58,0.10)", flexShrink: 0
      }}>
        <input
          style={{ flex: 1, border: "none", outline: "none", fontFamily: "var(--font-body)", fontSize: "0.93rem", color: "var(--mtn)", background: "transparent" }}
          placeholder="Напишите вопрос или пожелание..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
          background: loading || !input.trim() ? "var(--sand)" : "var(--forest)",
          color: "var(--cream)", border: "none", padding: "0.62rem 1.4rem",
          borderRadius: "99px", fontFamily: "var(--font-body)", fontSize: "0.85rem",
          fontWeight: 600, cursor: loading ? "not-allowed" : "pointer"
        }}>
          {loading ? "..." : "Отправить"}
        </button>
      </div>

      {bookingYurt && (
        <BookingModal
          place={bookingYurt}
          onClose={() => setBookingYurt(null)}
          onBooked={() => setBookingYurt(null)}
        />
      )}

      <style>{`@keyframes bounce{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-5px);opacity:1}}`}</style>
    </div>
  );
};

export default AiPage;
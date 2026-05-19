// Login component with sessionStorage mock auth
import { useState } from "react";

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email жана сыр сөздү толтуруңуз");
      return;
    }
    sessionStorage.setItem("token", "fake-token");
    sessionStorage.setItem("user", email);
    onLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Кирүү</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Электрондук почта" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Сыр сөз" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Кирүү</button>
        </form>
        <p>
          Аккаунтуңуз жокпу?{" "}
          <button type="button" onClick={onSwitchToRegister} className="link-btn">Катталуу</button>
        </p>
      </div>
    </div>
  );
};
export default Login;
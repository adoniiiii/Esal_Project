// Register component with sessionStorage mock auth
import { useState } from "react";

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Бардык талааларды толтуруңуз");
      return;
    }
    sessionStorage.setItem("token", "fake-token");
    sessionStorage.setItem("user", email);
    sessionStorage.setItem("userName", name);
    onRegister();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Катталуу</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Аты-жөнүңүз" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Электрондук почта" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Сыр сөз" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Катталуу</button>
        </form>
        <p>
          Аккаунтуңуз барбы?{" "}
          <button type="button" onClick={onSwitchToLogin} className="link-btn">Кирүү</button>
        </p>
      </div>
    </div>
  );
};
export default Register;
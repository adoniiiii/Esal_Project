// Main App component with auth state and routing
import { useState, useEffect } from "react";
import YurtList from "./components/YurtList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleRegister = () => setIsAuthenticated(true);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading-container">Жүктөлүүдө...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <nav className="navbar">
          <div className="logo">🏔️ YurtBook</div>
          <div className="nav-links">
            <button onClick={() => setShowRegister(false)} className="nav-btn">Кирүү</button>
            <button onClick={() => setShowRegister(true)} className="nav-btn">Катталуу</button>
          </div>
        </nav>
        {showRegister ? (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="logo">🏔️ YurtBook</div>
        <div className="nav-links">
          <a href="#">Боз үйлөр</a>
          <a href="#">Менин брондорум</a>
          <a href="#">AI ассистент</a>
          <button onClick={handleLogout} className="logout-btn">Чыгуу</button>
        </div>
      </nav>
      <main>
        <h1>Кыргызстандын жайлоолоруна саякат</h1>
        <YurtList />
      </main>
    </div>
  );
}

export default App;
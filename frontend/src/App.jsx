import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import YurtList from "./components/YurtList";
import Login from "./components/Login";
import Register from "./components/Register";
import BookingsPage from "./pages/BookingsPage";
import AiPage from "./pages/AiPage";
import HeroCarousel from "./components/HeroCarousel";
import "./App.css";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
};

const AppNavbar = ({ onLogout }) => (
  <nav className="navbar">
    <div className="logo">
      <div className="logo-icon">🏔️</div>
      <span className="logo-text-main">Es</span>
      <span className="logo-text-accent">Al</span>
    </div>
    <div className="nav-links">
      <NavLink to="/">Yurts</NavLink>
      <NavLink to="/bookings">My Bookings</NavLink>
      <NavLink to="/ai">AI Assistant</NavLink>
      <button onClick={onLogout} className="logout-btn">
        Sign out
      </button>
    </div>
  </nav>
);

function AuthenticatedApp({ onLogout }) {
  return (
    <BrowserRouter>
      <AppNavbar onLogout={onLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroCarousel />
              <div className="ornament">
                <div className="ornament-line" />
                <span className="ornament-symbol">✦</span>
                <div className="ornament-line" />
              </div>
              <div className="section-header">
                <h2>Available Yurts</h2>
                <p>Handpicked jailoo stays across Kyrgyzstan</p>
              </div>
              <YurtList />
            </>
          }
        />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/ai" element={<AiPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (loading) return <div className="loading-container">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <>
        <nav className="navbar">
          <div className="logo">
            <div className="logo-icon">🏔️</div>
            <span className="logo-text-main">E</span>
            <span className="logo-text-accent">sal</span>
          </div>
          <div className="nav-links">
            <button
              onClick={() => setShowRegister(false)}
              className={`nav-btn${!showRegister ? " active" : ""}`}
            >
              Sign in
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className={`nav-btn${showRegister ? " active" : ""}`}
            >
              Register
            </button>
          </div>
        </nav>
        {showRegister ? (
          <Register
            onRegister={() => setIsAuthenticated(true)}
            onSwitchToLogin={() => setShowRegister(false)}
          />
        ) : (
          <Login
            onLogin={() => setIsAuthenticated(true)}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )}
      </>
    );
  }

  return <AuthenticatedApp onLogout={handleLogout} />;
}

export default App;

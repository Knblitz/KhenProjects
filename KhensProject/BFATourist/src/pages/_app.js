import "../styles/globals.css"; // Import global styles
import styles from "../styles/login.module.css"; // Import login styles
import React, { useState, useEffect } from "react";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validUsername = "1";
  const validPassword = "1";

  // Check session storage for authentication on page load
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("isAuthenticated");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true"); // Store authentication in session storage
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated"); // Clear session storage on logout
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ProtectedPage onLogout={handleLogout}>
      <Component {...pageProps} />
    </ProtectedPage>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className={styles["login-container"]}>
      <h1 className={styles["login-header"]}>OneMap Tourist Login</h1>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <div className={styles["login-input-group"]}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles["login-input-group"]}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles["login-button"]}>
          Login
        </button>
      </form>
    </div>
  );
}

function ProtectedPage({ children, onLogout }) {
  return (
    <div>
      <nav
        style={{
          backgroundColor: "#E3F2FD",
          padding: "10px 20px",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "2000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ color: "#546E7A", fontSize: "20px", fontWeight: "bold" }}>
          OneMap Tourist App
        </div>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            margin: "0",
            padding: "0",
            justifyContent: "flex-start",
            flexGrow: 1,
          }}
        >
          {["/", "/about", "/itinerary", "/map", ].map((path, index) => ( //nav headers + page links
            <li key={index} style={{ margin: "0" }}>
              <Link
                href={path}
                style={{
                  color: "#01579B",
                  textDecoration: "none",
                  fontSize: "16px",
                  padding: "8px 16px",
                  transition: "all 0.3s",
                  border: "2px solid transparent",
                  borderRadius: "4px",
                  textTransform: "capitalize",
                }}
              >
                {path === "/" ? "Home " : path.replace("/", "").replace(/\b\w/g, (char) => char.toUpperCase())}
                {/* Convert path to a more readable format */}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#2e364d",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "60px", // Shift the button slightly to the left
          }}
        >
          Logout
        </button>
      </nav>

      <div style={{ paddingTop: "60px" }}>{children}</div>
    </div>
  );
}

export default MyApp;
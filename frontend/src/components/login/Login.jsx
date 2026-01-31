import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:4545/ff-user/login", // LOGIN endpoint
        { email, password }, { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: response.data.userId,
            username: response.data.username
          })
        );

        localStorage.setItem(
          "savedRecipes",
          JSON.stringify(response.data.savedRecipes || [])
        );

        navigate("/");
      } else {
        setMessage(response.data.result || "Login failed!");
      }
    } catch (error) {
      if (error.response?.data?.result) {
        setMessage(error.response.data.result);
      } else {
        setMessage("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card slide-in">
        <h2>Welcome Back 👩‍🍳</h2>
        <p className="auth-subtitle">Login to explore delicious recipes</p>

        {message && <p className="auth-error">{message}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-box">
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-toggle">
          New here?
          <Link to="/signup"> Create an account</Link>
        </p>
      </div>
    </div>
  );
}

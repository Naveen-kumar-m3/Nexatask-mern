import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button style={{ marginTop: 12 }} type="submit">Login</button>
      </form>
      <p style={{ marginTop: 8 }}>
        New? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

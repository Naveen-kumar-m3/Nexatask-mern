import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // GO TO DASHBOARD
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-teal-500 text-white w-full py-2 rounded"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-teal-600" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

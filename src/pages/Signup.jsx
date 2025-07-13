import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="container">
       
      <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit">Signup</button>
        <div className="footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

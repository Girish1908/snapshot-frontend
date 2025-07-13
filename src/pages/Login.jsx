import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import './Login.css'; // Assuming you have a CSS file for styling

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="container">
       
      <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
        <h2>Login</h2>
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
        <p><a href="/forgot-password">Forgot Password?</a></p>
        <button type="submit">Login</button>
         
        <div className="footer">
          <p>Don't have an account? <a href="/signup">Signup</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;

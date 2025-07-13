import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      alert("OTP sent to your email");

      
      localStorage.setItem("resetEmail", email);

      
      navigate("/reset-password");
    } catch (err) {
      alert("Failed to send OTP");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
import { useState } from "react";
import API from "../services/api";
import ResetPassword from "./ResetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      {otpSent && <ResetPassword email={email} />}
    </div>
  );
};

export default ForgotPassword;

import { useState, useEffect } from "react";
import API from "../services/api";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      alert("No email found. Please go to Forgot Password first.");
      window.location.href = "/forgot-password";
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/verify-otp", { email, otp, newPassword });
      alert("Password reset successful!");
      localStorage.removeItem("resetEmail"); 
      window.location.href = "/login";
    } catch (err) {
      alert("Failed to reset password: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="container">
      
      <form onSubmit={handleReset} style={{ maxWidth: 300 }}>
            <h2>Reset Password</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
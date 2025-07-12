import { useState } from "react";
import API from "../services/api";

const ResetPassword = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/verify-otp", { email, otp, newPassword });
      alert("Password reset successful!");
      window.location.href = "/login";
    } catch (err) {
      alert("Failed to reset password: " + err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleReset} style={{ maxWidth: 300, marginTop: 20 }}>
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
  );
};

export default ResetPassword;

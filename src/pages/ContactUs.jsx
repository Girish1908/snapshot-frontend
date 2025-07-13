// src/pages/ContactUs.jsx
import { useState } from "react";
import API from "../services/api";

const ContactUs = () => {
 const [form, setForm] = useState({
 name: "",
email: "",
message: ""
 });

 const [status, setStatus] = useState("");

 const handleChange = (e) => {
 setForm({ ...form, [e.target.name]: e.target.value });
};

 const handleSubmit = async (e) => {
 e.preventDefault();
setStatus("Sending...");
try {
 await API.post("/contact", form);
 setStatus("Message sent successfully!");
 setForm({ name: "", email: "", message: "" });
} catch (err) {
 console.error(err);
 setStatus("Failed to send message. Try again later.");
 }
};

 return (
 <div className="container" style={{ maxWidth: 600, margin: "auto" }}>
 <h2>Contact Us</h2>
 <form onSubmit={handleSubmit}>
 <input
 type="text"
 name="name"
 placeholder="Your Name"
value={form.name}
onChange={handleChange}
required
 style={{ width: "100%", marginBottom: 10 }}
 />
 <input
 type="email"
 name="email"
placeholder="Your Email"
 value={form.email}
 onChange={handleChange}
 required
 style={{ width: "100%", marginBottom: 10 }}
 />
<textarea
name="message"
 placeholder="Your Message"
 value={form.message}
 onChange={handleChange}
rows="5"
required
style={{ width: "100%", marginBottom: 10 }}
 />
 <button type="submit">Send</button>
</form>
 <p>{status}</p>
 </div>
 );
};

export default ContactUs;

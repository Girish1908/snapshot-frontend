import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
const navigate = useNavigate();
 const user = JSON.parse(localStorage.getItem("user"));
 const [query, setQuery] = useState("");

const logout = () => {
 localStorage.removeItem("token");
 localStorage.removeItem("user");
 navigate("/login", { replace: true });
 window.location.reload();
};

const handleSearch = (e) => {
 if ((e.key === "Enter" || e.type === "click") && query.trim()) {
navigate(`/search?q=${encodeURIComponent(query)}`);
setQuery("");
 }
 };

 return (
 <nav className="navbar">
<Link to="/" className="logo">📷 SnapShare</Link>

<div className="navbar-right">

 {user ? (
 <>
 <div className="search-bar">
<input
 type="text"
 placeholder="Search tags or users"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 onKeyDown={handleSearch}
/>
 <button onClick={handleSearch}>🔍</button>
</div>
<Link to="/feed">Explore</Link>
<Link to={`/profile/${user._id}`}>Profile</Link>
<Link to="/upload">Upload</Link>
<button onClick={logout}>Logout</button>
 </>
) : (
 <>
<Link to="/login">Login</Link>
<Link to="/signup">Signup</Link>
 </>
)}
 </div>
</nav>
);
};

export default Navbar;

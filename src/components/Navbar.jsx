import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true }); 
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <Link to="/">SnapShare</Link>
      <div>
        {user ? (
          <>
            <Link to="/upload">Upload</Link> |{" "}
            <Link to={`/profile/${user._id}`}>Profile</Link> |{" "}
            <Link to="/search">Search</Link> |{" "}
            <Link to="/notifications">🔔 Notifications</Link> |{" "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get("/users/notifications")
      .then(res => setNotifications(res.data))
      .catch(err => {
        console.error("Error fetching notifications:", err);
        alert("Login required to view notifications");
      });
  }, []);

  return (
    <div className="container">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n, i) => (
            <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid #ccc" }}>
              <strong>
                <Link to={`/user/${n.fromUser?._id}`}>
                  {n.fromUser?.username || "Someone"}
                </Link>
              </strong>{" "}
              {n.message}{" "}
              <br />
              <small>{new Date(n.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;

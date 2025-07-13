import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import PhotoCard from "../components/PhotoCard";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    API.get(`/users/${id}`).then(res => {
      setUser(res.data.user);
      setPhotos(res.data.photos);
    });
  }, [id]);

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:5000${user.profilePhoto}`}
        alt="Profile"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: 10
        }}
      />
      <h2>{user.username}</h2>
      {user.bio && <p style={{ fontStyle: "italic" }}>{user.bio}</p>}
      <p><strong>{photos.length}</strong> Posts</p>

      <hr style={{ margin: "20px 0" }} />
      {photos.map(photo => (
        <PhotoCard key={photo._id} photo={photo} />
      ))}
    </div>
  );
};

export default UserProfile;
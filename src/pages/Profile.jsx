import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Profile = () => {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    API.get(`/photos/user/${id}`)
      .then(res => setPhotos(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="container">
      <h2>User Profile</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {photos.map(p => (
          <img
            key={p._id}
            src={`http://localhost:5000/api/photos/image/${p._id}`}
            alt="profile"
            style={{ width: 200 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;

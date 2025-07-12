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
    <div className="container">
      <h2>{user.username}'s Profile</h2>
      {photos.map(photo => (
        <PhotoCard key={photo._id} photo={photo} />
      ))}
    </div>
  );
};

export default UserProfile;

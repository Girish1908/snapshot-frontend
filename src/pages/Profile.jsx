import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import PhotoCard from "../components/PhotoCard";
import EditProfileForm from "./EditProfile";
import "./Profile.css";

const Profile = () => {
 const { id } = useParams();
const [user, setUser] = useState({});
const [photos, setPhotos] = useState([]);
const [editing, setEditing] = useState(false);

const isCurrentUser = id === JSON.parse(localStorage.getItem("user"))?._id;
 useEffect(() => {
API.get(`/users/${id}`).then((res) => {
 setUser(res.data.user);
setPhotos(res.data.photos);
 });
 }, [id]);

 const handleUpdate = (updatedUser) => {
 setUser((prev) => ({ ...prev, ...updatedUser }));
 };

const handleDeletePhoto = async (photoId) => {
 if (!window.confirm("Are you sure you want to delete this photo?")) return;
try {
 await API.delete(`/photos/delete/${photoId}`);
 setPhotos((prev) => prev.filter((p) => p._id !== photoId));
 } catch (err) {
 console.error("Delete failed", err);
 alert("Failed to delete photo");
 }
 };

 return (
 <div className="container">
<div className="profile-header">
  <div className="profile-info">
    {user.profilePhotoUrl && (
      <img
        src={`http://localhost:5000${user.profilePhotoUrl}`}
        alt="Profile"
        className="profile-image"
      />
    )}
    <div>
      <h2>{user.username}</h2>
      <p>{user.bio}</p>
      <p><strong>{photos.length}</strong> Posts</p>
    </div>
  </div>
  {isCurrentUser  && !editing && (
    <button
      onClick={() => setEditing(true)}
      className="edit-profile-button"
    >
      ✏️ Edit Profile
    </button>
  )}
</div>

{editing && (
        <EditProfileForm
          initialBio={user.bio}
          onUpdate={handleUpdate}
          onClose={() => setEditing(false)}
        />
      )}
    

      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-item">
            <PhotoCard photo={photo} />
            {isCurrentUser && (
              <button
                onClick={() => handleDeletePhoto(photo._id)}
                className="delete-photo-button"
              >
                🗑 Delete
 </button>
)}
 </div>
  ))}
 </div>
 </div>
 );
};

export default Profile;

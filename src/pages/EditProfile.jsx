import { useState } from "react";
import API from "../services/api";

const EditProfileForm = ({ initialBio, onUpdate, onClose }) => {
  const [bio, setBio] = useState(initialBio || "");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (photo) formData.append("photo", photo);
    formData.append("bio", bio);

    setLoading(true);
    try {
      const res = await API.put("/users/update-profile", formData);
      onUpdate(res.data.user); // pass updated user to parent
      onClose(); // close form
    } catch (err) {
      alert("Update failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <label>
        Bio:
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </label>

<label>
 Profile Photo:
 <input
 type="file"
 accept="image/*"
onChange={(e) => setPhoto(e.target.files[0])}
style={{ display: "block", marginBottom: 10 }}
 />
</label>
<button type="submit" disabled={loading}>
 {loading ? "Updating..." : "Update Profile"}
</button>
<button type="button" onClick={onClose} style={{ marginLeft: 10 }}>
Cancel
 </button>
 </form>
 );
};

export default EditProfileForm;
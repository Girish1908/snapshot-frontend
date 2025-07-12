import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const PhotoCard = ({ photo }) => {
  const [likes, setLikes] = useState(photo.likes?.length || 0);
  const [comment, setComment] = useState("");

const handleLike = async () => {
  try {
    const res = await API.post(`/photos/${photo._id}/like`); // ✅ Use API
    setLikes(res.data.likes);
  } catch (err) {
    console.error(err);
    alert("You must be logged in to like");
  }
};

const handleComment = async (e) => {
  e.preventDefault();
  try {
    await API.post(`/photos/${photo._id}/comment`, { text: comment }); // ✅ Use API
    setComment("");
    alert("Comment added");
  } catch (err) {
    console.error(err);
    alert("Login required");
  }
};


  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 15 }}>
      <img
        src={`http://localhost:5000${photo.imageUrl}`}
        alt="photo"
        style={{ width: "100%", maxWidth: 300 }}
      />
      <p>
  <strong>
     <Link to={`/user/${photo.user._id}`}>{photo.user.username}</Link>
  </strong>
</p>
      <p>{photo.caption}</p>
      <button onClick={handleLike}>❤️ Like ({likes})</button>

      <form onSubmit={handleComment}>
        <input
          type="text"
          placeholder="Add comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginTop: 10, width: "100%" }}
        />
        <button type="submit">Post</button>
      </form>

      <div style={{ marginTop: 10 }}>
        {photo.comments?.map((c, i) => (
          <p key={i}>
             <Link to={`/user/${c.user._id}`}>{c.user.username}</Link>: {c.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PhotoCard;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const PhotoDetail = () => {
 const { id } = useParams();
const [photo, setPhoto] = useState(null);
 const [comment, setComment] = useState("");

 useEffect(() => {
 API.get(`/photos/${id}`)
 .then((res) => setPhoto(res.data))
 .catch((err) => {
 console.error(err);
 alert("Photo not found");
});
 }, [id]);
const handleLike = async () => {
  try {
    const res = await API.post(`/photos/${id}/like`); 
    setPhoto({ ...photo, likes: new Array(res.data.likes) });
  } catch (err) {
    console.error(err);
    alert("Login required to like");
  }
};

const handleComment = async (e) => {
  e.preventDefault();
  try {
    await API.post(`/photos/${id}/comment`, { text: comment }); 
    setComment("");
    setPhoto((prev) => ({
      ...prev,
      comments: [...prev.comments, { user: { username: "You" }, text: comment }],
    }));
  } catch (err) {
    console.error(err);
    alert("Login required to comment");
  }
};

 if (!photo) return <p>Loading...</p>;

 return (
    <div className="container">
      <h2>Photo by {photo.user.username}</h2>
      <img
        src={`http://localhost:5000${photo.imageUrl}`}
        alt="Photo"
        style={{ width: "100%", maxWidth: 400 }}
      />
      <p><strong>Caption:</strong> {photo.caption}</p>
      <p><strong>Tags:</strong> {photo.tags.join(", ")}</p>
      <p><strong>Likes:</strong> {photo.likes?.length || 0}</p>

      <button onClick={handleLike}>❤ Like</button>

      <form onSubmit={handleComment} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%" }}
        />
        <button type="submit">Post Comment</button>
      </form>

      <h4>Comments:</h4>
      {photo.comments?.map((c, i) => (
        <p key={i}>
          <strong>{c.user?.username || "user"}</strong>: {c.text}
        </p>
      ))}
    </div>
  );
};

export default PhotoDetail;
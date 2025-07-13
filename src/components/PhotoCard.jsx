import { useRef, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./PhotoCard.css"; // make sure this is imported

const PhotoCard = ({ photo }) => {
 const [likes, setLikes] = useState(photo.likes?.length || 0);
 const [comment, setComment] = useState("");
 const [showCommentInput, setShowCommentInput] = useState(false);
 const commentInputRef = useRef();

 const handleLike = async () => {
 try {
 const res = await API.post(`/photos/${photo._id}/like`);
 setLikes(res.data.likes);
 } catch (err) {
 console.error(err);
 alert("You must be logged in to like");
 }
};

 const handleComment = async (e) => {
e.preventDefault();
 try {
 await API.post(`/photos/${photo._id}/comment`, { text: comment });
 setComment("");
alert("Comment added");
 } catch (err) {
console.error(err);
 alert("Login required");
 }
 };

 return (
 <div className="photo-card">
 <img src={`http://localhost:5000${photo.imageUrl}`} alt="photo" />
 <div className="photo-overlay">
 <button onClick={handleLike} title="Like">❤️ {likes}</button>
 <button
 onClick={() => {
 setShowCommentInput(true);
 setTimeout(() => commentInputRef.current?.focus(), 100);
 }}
title="Comment"
 >
 💬
 </button>
</div>

 <div className="photo-info">
 <p>
<strong><Link to={`/user/${photo.user._id}`}>{photo.user.username}</Link></strong>
 </p>
 <p className="caption">{photo.caption}</p>
 </div>

 {showCommentInput && (
 <form onSubmit={handleComment} className="comment-form">
 <input
 ref={commentInputRef}
 type="text"
placeholder="Add comment..."
value={comment}
onChange={(e) => setComment(e.target.value)}
/>
<button type="submit">Post</button>
 </form>
)}

 <div className="comment-list">
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

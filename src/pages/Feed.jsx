import { useEffect, useState } from "react";
import API from "../services/api";
import PhotoCard from "../components/PhotoCard";
import "../pages/Feed.css"; 

const Feed = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    API.get("/photos/feed")
      .then(res => setPhotos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="feed-container">
      <h2 className="feed-title">Explore</h2>
      <div className="masonry">
        {photos.map(photo => (
          <PhotoCard key={photo._id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
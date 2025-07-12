import { useEffect, useState } from "react";
import API from "../services/api";
import PhotoCard from "../components/PhotoCard";

const Feed = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    API.get("/photos/feed")
      .then(res => setPhotos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Latest Photos</h2>
      {photos.map(photo => (
        <PhotoCard key={photo._id} photo={photo} />
      ))}
    </div>
  );
};

export default Feed;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import PhotoCard from "../components/PhotoCard";

const Search = () => {
  const [photos, setPhotos] = useState([]);
  const [params] = useSearchParams();
  const query = params.get("q");

  useEffect(() => {
    if (query) {
      API.get(`/photos/search?q=${query}`).then((res) => setPhotos(res.data));
    }
  }, [query]);

  return (
    <div className="container">
      <h2>Search Results for: {query}</h2>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-item">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
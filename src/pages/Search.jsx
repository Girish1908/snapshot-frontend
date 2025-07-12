import { useState } from "react";
import API from "../services/api";
import PhotoCard from "../components/PhotoCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleSearch = async () => {
    const res = await API.get(`/photos/search?q=${query}`);
    setPhotos(res.data);
  };

  return (
    <div className="container">
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search by tag or username"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: 300 }}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: 20 }}>
        {photos.map(photo => (
          <PhotoCard key={photo._id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Search;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select an image to upload");

    const formData = new FormData();
    formData.append("photo",file);
    formData.append("caption",caption);
    formData.append("tags",tags);

    try {
  await API.post("/photos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  alert("Photo uploaded successfully");
  navigate("/");
} catch (err) {
  console.error(err);
  const msg = err.response?.data?.message || "Unknown error during upload";
  alert("Upload failed: " + msg);
}
};


  return (
    <div className="container">
      <h2>Upload Photo</h2>
      <form onSubmit={handleUpload} style={{ maxWidth: 400 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          style={{ marginBottom: 10 }}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", marginBottom: 10 }}
          />
        )}
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;

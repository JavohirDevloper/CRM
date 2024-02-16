// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "./videos.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VideoUpload = () => {
  const [videos, setVideos] = useState(null);
  const [name, setName] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [type, setType] = useState("");
  const [stars, setStars] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const videos = e.target.files[0];
    if (videos) {
      setVideos(videos);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("videos", videos);
    formData.append("name", name);
    formData.append("hashtag", hashtag);
    formData.append("type_file", type);
    formData.append("stars", stars);

    try {
      await axios.post("http://localhost:5000/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Video uploaded successfully");
      setErrorMessage("");
      toast.success("Video muvaffaqiyatli yuklandi :)");
      navigate("/videos");
    } catch (error) {
      console.error("Error uploading video:", error);
      setErrorMessage("Error uploading video: " + error.message);
      setSuccessMessage("");
      toast.error("Video yuklanishida xatolik bor ):");
    }
  };

  return (
    <div className="container">
      <h2>Video Upload</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hashtag">Hashtag:</label>
          <input
            type="text"
            id="hashtag"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stars">Stars:</label>
          <input
            type="number"
            id="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Videos:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Upload Video</button>
      </form>
    </div>
  );
};

export default VideoUpload;

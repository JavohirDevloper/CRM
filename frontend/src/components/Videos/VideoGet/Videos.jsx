// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./videos.css";
import { Link } from "react-router-dom";

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    hashtag: "",
    type_file: "",
    stars: 0,
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/videos");
      setVideos(response.data);
    } catch (error) {
      console.error("Videolarni olishda xatolik:", error);
      toast.error("Videolarni ko'rishda xatolik bor :(");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setFormData({
      name: video.name,
      hashtag: video.hashtag,
      type_file: video.type_file,
      stars: video.stars,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/videos/${selectedVideo._id}`,
        formData
      );
      toast.success("Video muvaffaqiyatli yangilandi :)");
      setFormData({ name: "", hashtag: "", type_file: "", stars: 0 });
      setSelectedVideo(null);
      fetchVideos();
    } catch (error) {
      console.error("Video yangilashda xatolik:", error);
      toast.error("Video yangilashda xatolik bor :(");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/videos/${id}`);
      toast.success("Video deleted successfully");
      fetchVideos();
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("An error occurred while deleting the video");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Barcha videolar</h2>
      <Link to={"/videos/create"} className="btn">
        Add Video
      </Link>
      <div className="video-list">
        {videos.map((video, index) => (
          <div
            key={video._id}
            className={`video-card ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <div>
              <video width="320" height="240" controls>
                <source src={video.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="video-info">
              <p>Name: {video.name}</p>
              <p>Hashtag: {video.hashtag}</p>
              <p>Turi: {video.type_file}</p>
              <p>Yulduzlar: {video.stars}</p>
            </div>
            <div className="video-actions">
              {selectedVideo && selectedVideo._id === video._id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Hashtag"
                    name="hashtag"
                    value={formData.hashtag}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Type"
                    name="type_file"
                    value={formData.type_file}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Stars"
                    name="stars"
                    value={formData.stars}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Update</button>
                </form>
              ) : (
                <div className="gap">
                  <button onClick={() => handleEdit(video)}>Edit</button>
                  <button onClick={() => handleDelete(video._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoManagement;

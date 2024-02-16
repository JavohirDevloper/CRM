// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "./courses.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCourses = () => {
  const [courses, setCourses] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tip, setTip] = useState("")
  const [number_of_lessons, setNumbeOfLessons] = useState("")
  const [continuity, setContinuity] = useState("")
  const [module, setModel] = useState("")
  const [stars, setStars] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleCoursesChange = (e) => {
    const courses = e.target.files[0];
    if (courses) {
      setCourses(courses);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", courses);
    formData.append("courses_name", name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tip", tip);
    formData.append("number_of_lessons", number_of_lessons);
    formData.append("continuity", continuity);
    formData.append("module", module);
    formData.append("stars", stars);

    try {
      await axios.post("http://localhost:5000/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Courses uploaded successfully");
      setErrorMessage("");
      toast.success("Courses muvaffaqiyatli yuklandi :)");
      navigate("/courses");
    } catch (error) {
      console.error("Error uploading Courses:", error);
      setErrorMessage("Error uploading Courses: " + error.message);
      setSuccessMessage("");
      toast.error("Courses yuklanishida xatolik bor ):");
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
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Tip:</label>
          <input
            type="text"
            id="tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="number_of_lessons">NumbeOfLessons:</label>
          <input
            type="text"
            id="number_of_lessons"
            value={number_of_lessons}
            onChange={(e) => setNumbeOfLessons(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="continuity">Continuity:</label>
          <input
            type="text"
            id="continuity"
            value={continuity}
            onChange={(e) => setContinuity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Module:</label>
          <input
            type="text"
            id="module"
            value={module}
            onChange={(e) => setModel(e.target.value)}
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
          <label htmlFor="file">Courses:</label>
          <input type="file" id="file" onChange={handleCoursesChange} />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Upload Courses</button>
      </form>
    </div>
  );
};

export default CreateCourses;

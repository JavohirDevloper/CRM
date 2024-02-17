// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./courses.css";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState(null);
  const [formData, setFormData] = useState({
    courses_name: "",
    title: "",
    description: "",
    tip: "",
    number_of_lessons: 0,
    continuity: "",
    module: "",
    stars: 0,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Kurslarni olishda xatolik:", error);
      toast.error("Kurslarni ko'rishda xatolik bor :(");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (courses) => {
    setSelectedCourses(courses);
    setFormData({
      courses_name: courses.courses_name,
      title: courses.title,
      description: courses.description,
      tip: courses.tip,
      number_of_lessons: courses.number_of_lessons,
      continuity: courses.continuity,
      module: courses.module,
      stars: courses.stars,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/courses/${selectedCourses._id}`,
        formData
      );
      toast.success("Kurs muvaffaqiyatli yangilandi :)");
      setFormData({
        courses_name: "",
        title: "",
        description: "",
        tip: "",
        number_of_lessons: 0,
        continuity: "",
        module: "",
        stars: 0,
      });
      setSelectedCourses(null);
      fetchCourses();
    } catch (error) {
      console.error("Kurs yangilashda xatolik:", error);
      toast.error("Kurs yangilashda xatolik bor :(");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/courses/${id}`);
      toast.success("Kurs oʻchirib tashlandi");
      fetchCourses();
      setSelectedCourses(null);
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("An error occurred while deleting the courses");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Barcha kurslar</h2>
      <Link to={"/courses/create"} className="btn">
        Add Courses
      </Link>
      <div className="video-list">
        {courses.map((course, index) => (
          <div
            key={course._id}
            className={`video-card ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <div>
              <img
                src={`http://localhost:5000/${course?.courses_img}`}
                alt="Course Image"
                width="320"
                height="240"
              />
              <source />
            </div>
            <div className="video-info">
              <p>Name: {course.courses_name}</p>
              <p>Title: {course.title}</p>
              <p>Description: {course.description}</p>
              <p>Tip: {course.tip}</p>
              <p>Module:{course.module}</p>
              <p>Davomiylik: {course.number_of_lessons}</p>
              <p>Darslar soni: {course.continuity}</p>
              <p>Yulduzlar: {course.stars}</p>
            </div>
            <div className="video-actions">
              {selectedCourses && selectedCourses._id === course._id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="courses_name"
                    value={formData.courses_name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Tip"
                    name="tip"
                    value={formData.type_file}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Module"
                    name="module"
                    value={formData.module}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Number of lessons"
                    name="text"
                    value={formData.number_of_lessons}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Continuity"
                    name="continuity"
                    value={formData.continuity}
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
                  <button onClick={() => handleEdit(course)}>Edit</button>
                  <button onClick={() => handleDelete(course._id)}>
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

export default Courses;

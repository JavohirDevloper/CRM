import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./courses.css";
import Sidebar from "../../Home/Sidebar/Sidebar";

const Courses = () => {
  const isLogeddIn = localStorage.getItem("token") ? true : false;
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState(null);
  const [formData, setFormData] = useState({
    courses_name: "",
    category: "",
    description: "",
    number_of_lessons: 0,
    module: "",
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
      toast.error("Xatolik bor !");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (courses) => {
    setSelectedCourses(courses);
    setFormData({
      courses_name: courses.courses_name,
      category: courses.category,
      description: courses.description,
      number_of_lessons: courses.number_of_lessons,
      module: courses.module,
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
        category: "",
        description: "",
        number_of_lessons: 0,
        module: "",
      });
      setSelectedCourses(null);
      fetchCourses();
    } catch (error) {
      console.error("Kurs yangilashda xatolik:", error);
      toast.error("Xatolik bor !");
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
      toast.error("Xatolik bor!");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <Sidebar />
      </div>
      <div>
        <h2 className="courses_h2">Barcha kurslar</h2>
        <div className="card">
          {isLogeddIn
            ? courses.map((course, index) => (
                <div
                  key={course._id}
                  className={`video-card ${
                    index % 2 === 0 ? "even" : "odd"
                  } card-body`}
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
                    <p>{course.courses_name}</p>
                    <p>{course.category}</p>
                    <p>{course.description}</p>
                    <p>{course.module}</p>
                    <p>{course.number_of_lessons}</p>
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
                          placeholder="category"
                          name="category"
                          value={formData.category}
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
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Courses;

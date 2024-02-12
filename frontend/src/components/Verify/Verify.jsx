// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom"
import "./verify.css"
const Verify = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/verify", {
        email,
      });
      if (response.status === 201) {
        setMessage("Tasdiqlash kodi emailga yuborildi.");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/code/${verificationCode}`,
        { code: verificationCode }
      );
      console.log(response);
      if (response.status === 200) {
        setMessage("Tasdiqlandi! Bosh sahifaga oʻting.");
        navigate("/"); 
      }
    } catch (error) {
      console.log("Error verifying:", error);
    }
  };

  return (
    <div className="container">
      <h1>Ro'yxatdan o'tish</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Ro'yxatdan o'tish</button>

      <h2>Tasdiqlash kodini kiriting</h2>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerify}>Tasdiqlash</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Verify;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./verify.css";
const Verify = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/verify", {
        email,
      });
      if (response.status === 201) {
        setMessage("Tasdiqlash kodi emailga yuborildi.");
      }
      toast.success("Sizning gmailingizga kod bordi ");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error(error.message);
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
      toast.success("Siz tizimga kirdizngiz !");
    } catch (error) {
      console.log("Error verifying:", error);
      toast.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Roʻyxatdan oʻtish</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Roʻyxatdan oʻtish</button>

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

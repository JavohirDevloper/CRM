// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Verify from "./components/Verify/Verify";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/register" element={<Register/>}/>
        <Route path="/user/verify" element={<Verify/>}/>
      </Routes>
    </>
  );
};

export default App;

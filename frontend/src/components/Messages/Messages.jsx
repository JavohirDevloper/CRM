// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "../Home/Sidebar/Sidebar";
import "./message.css"
const Messages = () => {
  return (
    <div>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="message">

      Messages
      </div>
    </div>
  );
};

export default Messages;

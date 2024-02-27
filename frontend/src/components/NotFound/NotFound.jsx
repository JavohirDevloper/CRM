// eslint-disable-next-line no-unused-vars
import React from 'react'
import notfound from "../../../public/404.png"
import "./notfound.css"
const NotFound = () => {
  return (
    <div>
      <h2>404 Not Found</h2>
        <img  className="center" src={notfound} alt="" />
    </div>
  )
}

export default NotFound
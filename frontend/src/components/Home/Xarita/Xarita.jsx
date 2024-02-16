// eslint-disable-next-line no-unused-vars
import React from "react";
import "./xarita.css";
const Xarita = () => {
  return (
    <div className="continer">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.9701840177318!2d69.2255860754435!3d41.28775337131266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a45557ee78b%3A0x32b12dc4904a4e74!2sChilonzor-3%2C%20100115%2C%20%D0%A2%D0%BEshkent%2C%20Toshkent%2C%20O%60zbekiston!5e0!3m2!1suz!2s!4v1707903081850!5m2!1suz!2s"
        width="600"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="xarita"
      ></iframe>
    </div>
  );
};

export default Xarita;

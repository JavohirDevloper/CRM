// eslint-disable-next-line no-unused-vars
import React from "react";
import "./settings.css"
const Settings = () => {
  return (
    <div>
      <div className="user-profile__top-box">   
        <div className="user-profile__top">
          <div className="user-profile__top-title__box">
            <h2 className="user-profile__top-heading">Shaxsiy ma'lumotlar</h2>
            <button
              className="user-profile__top-title__box-button"
              type="button"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
              </svg>
            </button>
          </div>
          <div className="user-profile__top-wrapper">
            <img
              className="user-profile__img"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Javohir"
            />
            <div className="user-profile__name-box">
              <ul className="user-profile__name-list">
                <li className="user-profile__name-item">
                  <span>Familiya</span>
                  <strong>Muhammadiyev</strong>
                </li>
                <li className="user-profile__name-item">
                  <span>Ism</span>
                  <strong>Javohir</strong>
                </li>
                <li className="user-profile__name-item">
                  <span>Jinsi</span>
                  <strong>Erkak</strong>
                </li>
                <li className="user-profile__name-item">
                  <span>Tug'ilgan sana</span>
                  <strong>00/00/0000</strong>
                </li>
                <li className="user-profile__name-item">
                  <span>Telefon raqam</span>
                  <strong>+998330112223</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="user-profile__top__login-value">
          <ul className="user-profile__top__login-value__list">
            <li className="user-profile__top__login-value__item">
              <div className="user-profile__top__login-value__item-top">
                <strong className="user-profile__top__login-value__text">
                  Kirish
                </strong>
                <button
                  className="user-profile__top-title__box-button"
                  type="button"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
                  </svg>
                </button>
              </div>
              <span>+998330112223</span>
            </li>
            <li className="user-profile__top__login-value__item">
              <div className="user-profile__top__login-value__item-top">
                <strong className="user-profile__top__login-value__text">
                  Parol
                </strong>
                <button
                  className="user-profile__top-title__box-button"
                  type="button"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
                  </svg>
                </button>
              </div>
              <span>●●●●●●●●</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;

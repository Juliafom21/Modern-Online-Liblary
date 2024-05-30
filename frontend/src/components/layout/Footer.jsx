import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { FaGitSquare } from "react-icons/fa";
import { Context } from "../../main";
import { FaBook } from "react-icons/fa";

const Footer = () => {
  const isDashboard = useLocation("http://localhost:5173/dashboard");
  const { mode, setMode } = useContext(Context);

  return (
    <footer
      className={
        isDashboard.pathname === "/dashboard"
          ? "hideFooter"
          : mode === "light"
            ? "light-footer"
            : "dark-footer"
      }
    >
      <div className="container">
        <div className="about">
          <h3>Про нас</h3>
          <p>
            Ласкаво просимо до онлайн бібліотеки, де зустрічаються талановиті автори та пристрасні читачі! Наша бібліотека - це віртуальний світ, де слова стають живими, а історії оживають під чутливими очима читачів.
          </p>
          <p>
            <span>Пошта:</span>online_library@gmail.com
          </p>
          <p>
            <span>Телефон:</span>+380931234567890
          </p>
        </div>
        <div className="quick_links">
          <h3>Швидке переміщення</h3>
          <ul>
            <Link to={ "/" }>Головна</Link>
            <Link to={ "/blogs" }>Книги</Link>
            <Link to={ "/about" }>Про нас</Link>
            <Link to={ "/dashboard" }>Панель керування</Link>
          </ul>
        </div>
        <div className="categories">
          <h3>Категорії</h3>
          <ul>
            <li>Художня література</li>
            <li>Наукова література</li>
            <li>Дитяча література</li>
            <li>Історична література</li>
            <li>Поезія</li>
            <li>Мемуари та біографі</li>
            <li>Фантастика та фентезі</li>
            <li>Релігійна література</li>
            <li>Кулінарна література</li>
            <li>Психологія та саморозвиток</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="logo">  <FaBook className='icon' />Online <span>Library</span></div>
        <div className="links">
          <Link to={ "/" } target="_blank">
            <AiFillInstagram />
          </Link>
          <Link to={ "/" } target="_blank">
            <FaGitSquare />
          </Link>
          <Link to={ "" } target="_blank">
            <AiFillYoutube />
          </Link>
          <Link to={ "/" } target="_blank">
            <AiFillLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

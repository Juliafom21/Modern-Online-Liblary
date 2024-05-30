import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Context } from "../../main";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBook } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const handleNavbar = () => {
    setShow(!show);
  };

  const isDashboard = useLocation("http://localhost:5173/dashboard");

  const { mode, setMode, isAuthenticated, user, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section
      className={
        isDashboard.pathname === "/dashboard"
          ? "hideNavbar"
          : mode === "light"
            ? "header light-navbar"
            : "header dark-navbar"
      }
    >
      <nav>
        <div className="logo">
          <FaBook className='icon' />
          Online<span>Library</span>
        </div>
        <div className={ show ? "links show" : "links" }>
          <ul>
            <li>
              <Link to={ "/" } onClick={ handleNavbar }>
                Головна
              </Link>
            </li>
            <li>
              <Link to={ "/blogs" } onClick={ handleNavbar }>
                Книги
              </Link>
            </li>
            <li>
              <Link to={ "/authors" } onClick={ handleNavbar }>
                Всі автори
              </Link>
            </li>
            <li>
              <Link to={ "/about" } onClick={ handleNavbar }>
                Про нас
              </Link>
            </li>
          </ul>
          <div className="btns">
            <button
              onClick={ () =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
              className={
                mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
              }
            >
              { mode === "light" ? (
                <CiLight className="light-icon" />
              ) : (
                <MdDarkMode className="dark-icon" />
              ) }
            </button>
            { isAuthenticated && user.role === "Author" ? (
              <Link
                to={ "/dashboard" }
                onClick={ handleNavbar }
                className="dashboard-btn"
              >
                Панель керування
              </Link>
            ) : (
              ""
            ) }
            { !isAuthenticated ? (
              <Link to={ "/login" } onClick={ handleNavbar } className="login-btn">
                Увійти
              </Link>
            ) : (
              <div>
                <button className="logout-btn" onClick={ handleLogout }>
                  Вийти
                </button>
              </div>
            ) }
          </div>
        </div>
        <RxHamburgerMenu className="hamburger" onClick={ handleNavbar } />
      </nav>
    </section>
  );
};

export default Navbar;

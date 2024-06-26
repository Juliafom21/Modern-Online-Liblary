import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { mode, isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setEmail("");
        setPassword("");
        setRole("");
        navigateTo("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={ '/' } />
  }

  return (
    <article className={ mode === "dark" ? "dark-bg" : "light-bg" }>
      <section className="auth-form">
        <form onSubmit={ handleLogin }>
          <h1>Вхід</h1>
          <div>
            <select value={ role } onChange={ (e) => setRole(e.target.value) }>
              <option value="">Обрати роль</option>
              <option value="Reader">Читач</option>
              <option value="Author">Автор</option>
            </select>
          </div>
          <div>
            <input
              type="email"
              placeholder="Пошта"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </div>
          <p>
            Незареєстровані? <Link to={ "/register" }>Зареєструватися</Link>
          </p>

          <button className="submit-btn" type="submit">
            Увійти
          </button>
        </form>
      </section>
    </article>
  );
};

export default Login;

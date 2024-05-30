import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const changeAvatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const { mode, isAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("education", education);
    formData.append("role", role);
    formData.append("avatar", avatar);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setEducation("");
      setPassword("");
      setPhone("");
      setRole("");
      setAvatar("");
      setAvatarPreview("");
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={ "/" } />;
  }

  return (
    <article className={ mode === "dark" ? "dark-bg" : "light-bg" }>
      <section className="auth-form">
        <form onSubmit={ handleRegister }>
          <h1>Реєстрація</h1>
          <select value={ role } onChange={ (e) => setRole(e.target.value) }>
            <option value="">Оберіть вашу роль </option>
            <option value="Reader">Читач</option>
            <option value="Author">Автор</option>
          </select>
          <div>
            <input
              type="text"
              placeholder="Ім'я"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
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
              type="number"
              placeholder="Номер телефону"
              value={ phone }
              onChange={ (e) => setPhone(e.target.value) }
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
          <select
            value={ education }
            onChange={ (e) => setEducation(e.target.value) }
          >
            <option value="">Оберіть рівень вашої освіти</option>
            <option value="Matric">Не має освіти</option>
            <option value="Intermediate">Середня освіта</option>
            <option value="Graducation">Вища освіта (бакалавр)</option>
            <option value="Masters">Вища освіта (магістр)</option>
            <option value="PhD">Доктор наук</option>
          </select>
          <div
            style={ {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            } }
          >
            <div className="avatar">
              <img
                src={ avatarPreview ? `${avatarPreview}` : "/pic.jpg" }
                alt="Фото"
              />
            </div>
            <input
              type="file"
              onChange={ changeAvatarHandler }
              className="avatar_input_tag"
              style={ { border: "none" } }
            />
          </div>
          <p>
            Вже зареєстровані? <Link to={ "/login" }>Увійти</Link>
          </p>
          <button className="submit-btn" type="submit">
            Зареєструватися
          </button>
        </form>
      </section>
    </article>
  );
};

export default Register;

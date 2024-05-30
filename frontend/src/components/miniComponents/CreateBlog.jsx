import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [intro, setIntro] = useState("");
  const [paraOneTitle, setParaOneTitle] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [paraOneDescription, setParaOneDescription] = useState("");
  const [paraTwoTitle, setParaTwoTitle] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [paraTwoDescription, setParaTwoDescription] = useState("");
  const [paraThreeTitle, setParaThreeTitle] = useState("");
  const [paraThreeImage, setParaThreeImage] = useState("");
  const [paraThreeDescription, setParaThreeDescription] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(true);


  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result);
      setMainImage(file);
    };
  };
  const paraOneImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result);
      setParaOneImage(file);
    };
  };
  const paraTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result);
      setParaTwoImage(file);
    };
  };
  const paraThreeImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaThreeImagePreview(reader.result);
      setParaThreeImage(file);
    };
  };

  const handleBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("intro", intro);
    formData.append("mainImage", mainImage);
    formData.append("category", category);
    formData.append("published", published);
    if (paraOneTitle.length > 0) {
      formData.append("paraOneTitle", paraOneTitle);
    }
    if (paraOneDescription.length > 0) {
      formData.append("paraOneDescription", paraOneDescription);
    }
    if (paraOneImage) {
      formData.append("paraOneImage", paraOneImage);
    }
    if (paraTwoTitle.length > 0) {
      formData.append("paraTwoTitle", paraTwoTitle);
    }
    if (paraTwoDescription.length > 0) {
      formData.append("paraTwoDescription", paraTwoDescription);
    }
    if (paraTwoImage) {
      formData.append("paraTwoImage", paraTwoImage);
    }
    if (paraThreeTitle.length > 0) {
      formData.append("paraThreeTitle", paraThreeTitle);
    }
    if (paraThreeDescription.length > 0) {
      formData.append("paraThreeDescription", paraThreeDescription);
    }
    if (paraThreeImage) {
      formData.append("paraThreeImage", paraThreeImage);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/blog/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTitle("");
      setIntro("");
      setCategory("");
      setMainImage("");
      setMainImagePreview("");
      setParaOneTitle("");
      setParaOneDescription("");
      setParaOneImage("");
      setParaOneImagePreview("");
      setParaTwoTitle("");
      setParaTwoDescription("");
      setParaTwoImage("");
      setParaTwoImagePreview("");
      setParaThreeTitle("");
      setParaThreeDescription("");
      setParaThreeImage("");
      setParaThreeImagePreview("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="create-blog">
      <h3>Створити книгу</h3>
      <div className="container">
        <form onSubmit={ handleBlog }>
          <div className="category-box">
            <label>Категорія</label>
            <select
              value={ category }
              onChange={ (e) => setCategory(e.target.value) }
            >
              <option value="">Оберіть категорію</option>
              <option value="Fiction">Художня література</option>
              <option value="Non-fiction">Наукова література</option>
              <option value="Children's Books">Дитяча література</option>
              <option value="History ">Історична література</option>
              <option value="Poetry">Поезія</option>
              <option value="Memoirs & Biographies">Мемуари та біографії</option>
              <option value="Science Fiction & Fantasy">Фантастика та фентезі</option>
              <option value="Religion & Spirituality">Релігійна література</option>
              <option value="Cooking, Food & Wine">Кулінарна література</option>
              <option value="Self-help & Psychology">Психологія та саморозвиток</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Назва книги"
            value={ title }
            onChange={ (e) => setTitle(e.target.value) }
          />
          <div style={ { display: "flex", flexDirection: "column" } }>
            <label>Обкладинка</label>
            <img
              src={ mainImagePreview ? `${mainImagePreview}` : "/imgPL.webp" }
              alt="mainImg"
              className="mainImg"
            />
            <input
              type="file"
              onChange={ mainImagePreviewHandler }
              style={ { border: "none" } }
            />
          </div>
          <textarea
            rows="25"
            className="intro"
            placeholder="Вступ"
            value={ intro }
            onChange={ (e) => setIntro(e.target.value) }
          />
          <div className="sub-para">
            <input
              type="text"
              placeholder="Параграф"
              value={ paraOneTitle }
              onChange={ (e) => setParaOneTitle(e.target.value) }
            />
            <img
              src={
                paraOneImagePreview ? `${paraOneImagePreview}` : "/imgPL.webp"
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={ paraOneImagePreviewHandler }
              style={ { border: "none" } }
            />
            <textarea
              rows="10"
              placeholder="Опис"
              value={ paraOneDescription }
              onChange={ (e) => setParaOneDescription(e.target.value) }
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Параграф"
              value={ paraTwoTitle }
              onChange={ (e) => setParaTwoTitle(e.target.value) }
            />
            <img
              src={
                paraTwoImagePreview ? `${paraTwoImagePreview}` : "/imgPL.webp"
              }
              alt="subParaTwoImg"
            />
            <input
              type="file"
              onChange={ paraTwoImagePreviewHandler }
              style={ { border: "none" } }
            />
            <textarea
              rows="10"
              placeholder="Опис"
              value={ paraTwoDescription }
              onChange={ (e) => setParaTwoDescription(e.target.value) }
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Параграф"
              value={ paraThreeTitle }
              onChange={ (e) => setParaThreeTitle(e.target.value) }
            />
            <img
              src={
                paraThreeImagePreview
                  ? `${paraThreeImagePreview}`
                  : "/imgPL.webp"
              }
              alt="subParaThreeImg"
            />
            <input
              type="file"
              onChange={ paraThreeImagePreviewHandler }
              style={ { border: "none" } }
            />
            <textarea
              rows="10"
              placeholder="Опис"
              value={ paraThreeDescription }
              onChange={ (e) => setParaThreeDescription(e.target.value) }
            />
          </div>
          <div className="publish-box">
            <label>Опублікувати книгу зараз?</label>
            <select
              value={ published }
              onChange={ (e) => setPublished(e.target.value === "true") }
            >
              <option value={ true }>Так</option>
              <option value={ false }>Ні</option>
            </select>
          </div>
          <button className="create-btn" type="submit">
            Опублікувати книгу
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;

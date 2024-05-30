import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Context } from "../../main";

const UpdateBlog = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/blog/singleblog/${id}`,
          { withCredentials: true }
        );
        setTitle(data.blog.title);
        setIntro(data.blog.intro);
        setCategory(data.blog.category);
        setPublished(data.blog.published);
        setMainImage(data.blog.mainImage.url);
        setParaOneTitle(data.blog.paraOneTitle);
        setParaOneDescription(data.blog.paraOneDescription);
        data.blog.paraOneImage && setParaOneImage(data.blog.paraOneImage.url);
        setParaTwoTitle(data.blog.paraTwoTitle);
        setParaTwoDescription(data.blog.paraTwoDescription);
        data.blog.paraTwoImage && setParaTwoImage(data.blog.paraTwoImage.url);
        setParaThreeTitle(data.blog.paraThreeTitle);
        setParaThreeDescription(data.blog.paraThreeDescription);
        data.blog.paraThreeImage &&
          setParaThreeImage(data.blog.paraThreeImage.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBlog = new FormData();
    updatedBlog.append("Назва", title);
    updatedBlog.append("Вступ", intro);
    updatedBlog.append("Категорія", category);
    console.log(published);
    updatedBlog.append("Опублікування", published);
    updatedBlog.append("Головне Фото", mainImage);
    if (paraOneTitle && paraOneTitle.length !== 0) {
      updatedBlog.append("Заголовок 1", paraOneTitle);
    } else {
      updatedBlog.append("Зоголовок 1", "");
    }
    if (paraOneDescription && paraOneDescription.length !== 0) {
      updatedBlog.append("Опис", paraOneDescription);
    } else {
      updatedBlog.append("Опис 1", "");
    }
    if (paraOneImage) {
      updatedBlog.append("Фото 1", paraOneImage);
    }
    if (paraTwoTitle && paraTwoTitle.length !== 0) {
      updatedBlog.append("Заголовок 2", paraTwoTitle);
    } else {
      updatedBlog.append("Заголовок 2", "");
    }
    if (paraTwoDescription && paraTwoDescription.length !== 0) {
      updatedBlog.append("Опис 2", paraTwoDescription);
    } else {
      updatedBlog.append("Опис 2", "");
    }
    if (paraTwoImage) {
      updatedBlog.append("Фото 2", paraTwoImage);
    }
    if (paraThreeTitle && paraThreeTitle.length !== 0) {
      updatedBlog.append("Заголовок 3", paraThreeTitle);
    } else {
      updatedBlog.append("Заголовок 3", "");
    }
    if (paraThreeDescription && paraThreeDescription.length !== 0) {
      updatedBlog.append("Опис 3", paraThreeDescription);
    } else {
      updatedBlog.append("Опис 3", "");
    }
    if (paraThreeImage) {
      updatedBlog.append("Фото 3", paraThreeImage);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/blog/update/${id}`,
        updatedBlog,
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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

  const { mode } = useContext(Context);

  return (
    <article className={ mode === "dark" ? "dark-bg" : "light-bg" }>
      <section className="update-blog">
        <h3>Оновнення книги</h3>
        <form>
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
            placeholder="Назва"
            value={ title }
            onChange={ (e) => setTitle(e.target.value) }
          />
          <div
            style={ { display: "flex", flexDirection: "column", gap: "20px" } }
          >
            <label>Обкладинка книги</label>
            <img
              src={
                mainImagePreview
                  ? `${mainImagePreview}`
                  : mainImage
                    ? `${mainImage}`
                    : "/imgPL.webp"
              }
              alt="subParaOneImg"
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
            placeholder="Вступна частина має бути більшою за 250 символів"
            value={ intro }
            onChange={ (e) => setIntro(e.target.value) }
          />
          <div className="sub-para">
            <input
              type="text"
              placeholder="Заголовок"
              value={
                paraOneTitle && paraOneTitle.length > 0 ? paraOneTitle : ""
              }
              onChange={ (e) => setParaOneTitle(e.target.value) }
            />
            <img
              src={
                paraOneImagePreview
                  ? `${paraOneImagePreview}`
                  : paraOneImage
                    ? `${paraOneImage}`
                    : "/imgPL.webp"
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
              placeholder="Перший абзац книги має бути тут..."
              value={
                paraOneDescription && paraOneDescription.length > 0
                  ? paraOneDescription
                  : ""
              }
              onChange={ (e) => setParaOneDescription(e.target.value) }
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Заголовок 2"
              value={
                paraTwoTitle && paraTwoTitle.length > 0 ? paraTwoTitle : ""
              }
              onChange={ (e) => setParaTwoTitle(e.target.value) }
            />
            <img
              src={
                paraTwoImagePreview
                  ? `${paraTwoImagePreview}` // If paraOneImage exists, use it directly
                  : paraTwoImage // Otherwise, use paraOneImagePreview
                    ? `${paraTwoImage}`
                    : "/imgPL.webp" // If neither paraOneImage nor paraOneImagePreview exists, use an empty string
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={ paraTwoImagePreviewHandler }
              style={ { border: "none" } }
            />
            <textarea
              rows="10"
              placeholder="Другий абзац книги має бути тут..."
              value={
                paraTwoDescription && paraTwoDescription.length > 0
                  ? paraTwoDescription
                  : ""
              }
              onChange={ (e) => setParaTwoDescription(e.target.value) }
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Заголовок 3"
              value={
                paraThreeTitle && paraThreeTitle.length > 0
                  ? paraThreeTitle
                  : ""
              }
              onChange={ (e) => setParaThreeTitle(e.target.value) }
            />
            <img
              src={
                paraThreeImagePreview
                  ? `${paraThreeImagePreview}`
                  : paraThreeImage
                    ? `${paraThreeImage}`
                    : "/imgPL.webp"
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={ paraThreeImagePreviewHandler }
              style={ { border: "none" } }
            />
            <textarea
              rows="10"
              placeholder="Третій абзац книги має бути тут..."
              value={
                paraThreeDescription && paraThreeDescription.length > 0
                  ? paraThreeDescription
                  : ""
              }
              onChange={ (e) => setParaThreeDescription(e.target.value) }
            />
          </div>
          <div className="publish-box">
            <label>Публікувати?</label>
            <select
              value={ published === null ? "" : published }
              onChange={ (e) => setPublished(e.target.value === "true") }
            >
              <option value={ true }>Так</option>
              <option value={ false }>Ні</option>
            </select>
          </div>
          <button className="update-btn" onClick={ handleUpdate }>
            Оновити
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdateBlog;

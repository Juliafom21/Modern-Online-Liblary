import React, { useContext } from "react";
import { Context } from "../../main";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BiBookReader } from "react-icons/bi";

const MyProfile = () => {
  const { user } = useContext(Context);
  return (
    <section className="profile">
      <div className="avatar">
        <img src={ user.avatar.url } alt="avatar" /> {/* Изменили src на user.avatar.url */ }
      </div>
      <div className="user-detail">
        <p>
          <IoMdPerson className="icon" />
          Ім'я: <span>{ user.name }</span>
        </p>
        <p>
          <MdEmail className="icon" />
          Пошта: <span>{ user.email }</span>
        </p>
        <p>
          <FaPhoneAlt className="icon" />
          Номер телефону: <span>{ user.phone }</span> {/* Изменили "телевону" на "телефону" */ }
        </p>
        <p>
          <BiBookReader className="icon" />
          Роль: <span>{ user.role }</span>
        </p>
      </div>
    </section>
  );
};

export default MyProfile;

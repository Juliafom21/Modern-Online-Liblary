import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Ім'я повинне містити більше 3 знаків!"],
    maxLength: [32, "Ім'я не повинно перевищувати 32 знаки!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Введіть коректну електронну пошту!"],
  },
  phone: {
    type: Number,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
  },
  education: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Reader", "Author"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Пароль не має бути меншим 8 знаків!"],
    maxLength: [32, "Пароль не повинен перевищувати 32 знаки!"],
    select: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);

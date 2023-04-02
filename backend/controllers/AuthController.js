const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const RoleModel = require("../models/roleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

class AuthController {
  registerNewUser = asyncHandler(async (req, res) => {
    //получить данные от пользователя
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields!");
    }

    //ищем пользователя в базе данных
    const candidate = await UserModel.findOne({ email });

    //если пользователь есть, сообщаем, что пользователь уже существует
    if (candidate) {
      res.status(400);
      throw new Error("User already exists!");
    }
    //если пользователя нет, хэшируем пароль
    const hashPassword = bcrypt.hashSync(password, 10);
    //сохраняем пользователя в базе данных
    const userRole = await RoleModel.findOne({ value: "ADMIN" });
    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [userRole.value],
    });

    if (!user) {
      res.status(400);
      throw new Error("Cannot save user!");
    }

    res.status(201).json({
      code: 201,
      message: "Registration success!",
      data: user.email,
    });
  });

  loginUser = asyncHandler(async (req, res) => {
    //получить данные от пользователя
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields!");
    }

    //ищем пользователя в базе данных
    const user = await UserModel.findOne({ email });

    //если нашли, расшифровываем пароль
    const isValidPassword = bcrypt.compareSync(password, user?.password || "");
    //если не нашли или не расшифровали пароль, то "неверный логин или пароль"
    if (!user || !isValidPassword) {
      res.status(400);
      throw new Error("Invalid login or password!");
    }

    //генерируем токен и сохраняем в базе данных
    const token = generateToken({
      friends: ["Nastja", "Andrei", "Maksym", "Sergey", "Anatolii"],
      id: user._id,
      email: user.email,
      roles: user.roles,
    });

    user.token = token;

    const userWithToken = await user.save();

    if (!userWithToken) {
      res.status(400);
      throw new Error("Cannot save token!");
    }

    res.status(200).json({
      code: 200,
      message: "Login success!",
      data: { email: user.email, token: user.token },
    });
  });

  logoutUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(400);
      throw new Error("Cannot find user!");
    }

    user.token = null;

    const updatedUser = await user.save();

    if (!updatedUser) {
      res.status(400);
      throw new Error("Cannot logout user!");
    }

    res.status(200).json({
      code: 200,
      message: "Logout success!",
    });
  });
}

function generateToken(data) {
  return jwt.sign(data, "pizza", { expiresIn: "8h" });
}

module.exports = new AuthController();

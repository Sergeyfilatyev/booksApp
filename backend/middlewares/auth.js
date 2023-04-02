const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //читаем токен из заголовка

    const [tokenType, token] = req.headers.authorization.split(" ");

    //проверяем, чтобы у нас был передан токен и что это токен авторизации

    if (token && tokenType === "Bearer") {
      const decodedData = jwt.verify(token, "pizza");
      req.user = decodedData;
      next();
    };
    //если что-то не то, то говорим: "ты не авторизован"
    //если всё хорошо, расшифровываем токен
    //
  } catch (error) {
    res
      .status(401)
      .json({ code: 401, message: "Not authorized!", error: error.message });
  }
};

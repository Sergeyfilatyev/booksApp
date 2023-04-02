const { model, Schema } = require("mongoose");

usersShema = Schema({
  name: { type: String, default: "Ivan Susanin" },
  email: {
    type: String,
    requred: [true, "db: email is required"],
  },
  password: { type: String, requred: [true, "db: password is required"] },
  token: { type: String, default: null },
  roles: [{ type: String, ref: "Role" }],
});
module.exports = model("Users", usersShema);

const { model, Schema } = require("mongoose");

rolesShema = Schema({
  value: { type: String, default: "USER" },
});
module.exports = model("Roles", rolesShema);

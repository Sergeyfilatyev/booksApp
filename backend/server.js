require("colors");
const { engine } = require("express-handlebars");
const connectDb = require("../config/db");
const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
require("dotenv").config({ path: configPath });
const express = require("express");
const sendEmail = require("./services/sendEmail");

const app = express();

app.use(express.static("public"));

// set template engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "backend/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("./routes/booksRoutes"));
/* app.use("/", require("./routes/authRoutes")); */

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/send", async (req, res) => {
  try {
    await sendEmail(req.body);
    return res.render("send", {
      admin: "Nastja",
      moderator: "Sergey",
      customer: "Max",
      name: req.body.userName,
      email: req.body.userEmail,
      message: "Contact send success!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not found",
  });
  next();
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode);
  res.json({
    code: statusCode,
    message: err.message,
    stack: err.stack,
  });
});

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server  running on Port ${process.env.PORT} `.green.bold.italic);
});

// console.log("Hello fom Andrey".green.italic.bold);
// console.log("Hello fom Andrey".yellow.italic.bold);
// console.log("Hello fom Andrey".red.italic.bold);

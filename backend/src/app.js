express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {isLoggedIn} = require("./middlewares/auth.middleware.js");
app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const storage = {
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "static/images"));
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use(express.static(path.join(__dirname, "static")));

app.use("/", (req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/api", require("./routers/api.js"));

module.exports = app;

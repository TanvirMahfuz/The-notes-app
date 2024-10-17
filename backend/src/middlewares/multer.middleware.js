const multer = require("multer");
const path = require("path");

const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Middleware reached");
    cb(null, path.join(__dirname, "../static/pdf"));
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + "-" + file.originalname);
  },
});
const imgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Middleware reached(image)");
    cb(null, path.join(__dirname, "../static/profileImages"));
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + "-" + file.originalname);
  },
});
module.exports = {
  pdfUpload: multer({storage: pdfStorage}).single("doc"),
  imageUpload: multer({storage: imgStorage}).single("profileImage"),
};

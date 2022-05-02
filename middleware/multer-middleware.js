// Allow the user to manage files when adding a picture to a product
const multer = require('multer');
const fs = require("fs");

/* // file type management
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/pdf': 'pdf'
};

// The folder where the pictures will be stored, the folder named "images"
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

// White spaces and file name management
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// The single method indicates that only one file can be uploaded at a time
module.exports = multer({storage: storage}).single('picture'); */


var dir = "./images";   // PATH TO UPLOAD FILE
if (!fs.existsSync(dir)) {  // CREATE DIRECTORY IF NOT FOUND
  fs.mkdirSync(dir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
module.exports = upload;


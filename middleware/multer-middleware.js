// Allow the user to manage files when adding a picture to a product
const multer = require('multer');

// file type management
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// The folder where the pictures will be stored, images
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

module.exports = multer({storage: storage}).single('image');
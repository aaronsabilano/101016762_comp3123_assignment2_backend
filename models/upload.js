// middleware/upload.js

const multer = require('multer');
const path = require('path');

// Storage settings: save to /uploads, keep original filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Allowed image types
function fileFilter(req, file, cb) {
  const allowed = ['.jpg', '.jpeg', '.png'];
  
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.includes(ext)) {
    cb(new Error('Invalid file type. Only JPG/PNG allowed.'));
  } else {
    cb(null, true);
  }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;

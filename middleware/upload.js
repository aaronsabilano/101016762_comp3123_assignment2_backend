// middleware/upload.js
// Handles image uploads for employee profile pictures

const multer = require('multer');
const path = require('path');

// Where to store the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save into /backend/uploads folder (relative to server.js)
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // e.g. 1733012345678-originalname.png
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Only allow certain file types (jpg / jpeg / png)
const fileFilter = (req, file, cb) => {
  const allowedExts = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExts.includes(ext)) {
    return cb(new Error('Only JPG and PNG files are allowed'), false);
  }

  cb(null, true);
};

// Create the multer instance
const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;

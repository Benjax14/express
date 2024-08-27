const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'temporal/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  })
  
const upload = multer({ storage: storage });

const uploadSingleFile = upload.single('file');

module.exports = {
    uploadSingleFile
}
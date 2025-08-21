const multer = require('multer');
const path = require('path');

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadImages = multer({
    storage: storage
});

module.exports = uploadImages;
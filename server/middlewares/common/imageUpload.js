const multer = require('multer');
const path = require('path');

// storage definition
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.IMG_UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
            '-' +
            Date.now();
        cb(null, fileName + fileExt);
    }
});

//prepare final multer upload object
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .png or .jpeg formats are allowed!'));
        }
    }
});

module.exports = { upload };

const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { createWorker } = require('tesseract.js');

// storage definition
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.IMG_UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
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

const updateDatabase = async (req, res, next) => {
    const user = await req.db.User.findByPk(req.auth.userId);

    try {
        if (user.avatar) {
            const filePath = '.\\public' + user.avatar;
            console.log(filePath);
            fs.unlink(filePath, err => {
                if (err) {
                    console.log(err.message);
                    return;
                } else console.log('Existing file deleted.');
            });
        }
    } catch (error) {
        console.log(error);
    }

    const updatedFilePath = req.file.path.replace('public', '');
    req.db.User.update({ avatar: updatedFilePath }, { where: { id: req.auth.userId } })
        .then(data => {
            res.json({
                status: true,
                message: 'Upload successful!',
                path: updatedFilePath
            });
        })
        .catch(error => {
            next(error.message);
        });
};

const imageToText = async (req, res, next) => {
    try {
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const result = await worker.recognize(req.file.path);
        console.log(result.data.text);
        await worker.terminate();

        fs.unlink(req.file.path, err => console.log(err));

        res.json({
            status: true,
            message: 'Text found.',
            text: result.data.text
        });
    } catch (error) {
        next(error.message);
    }
};

module.exports = { upload, updateDatabase, imageToText };

const path = require('path');
const fs = require('fs');
const multer = require('multer');


const uploadDir = './avatars';
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, newFile) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
        const ext = path.extname(file.originalname);
        newFile(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req, file, newFile) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) newFile(null, true);
    else newFile(null, false);
};

const limits = {fileSize: 2 * 1024 * 1024, // 2 MB
};

const fileLoader = multer({
    storage,
    fileFilter,
    limits,
});

module.exports = fileLoader;

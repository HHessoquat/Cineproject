const multer = require('multer');
const { v4 } = require('uuid');

const MYME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'video/mp4': 'mp4',
    'video/quicktyme': 'mov',
    'video/x-matroska': 'mkv',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let destinationFolder = 'uploads';
        if (file.mimetype) {
            if (file.mimetype.startsWith('image')) {
                destinationFolder = 'uploads/images';
            } else if (MYME_TYPES[file.mimetype].startsWith('video')) {
                destinationFolder = 'uploads/videos';
            }
        }
        callback(null, destinationFolder);
    },
    filename: (req, file, callback) => {
        const name = v4();
        const extension = MYME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },
});

module.exports = multer({ storage }).fields([
    { name: 'posterFile', maxCount: 1 },
    { name: 'trailerFile', maxCount: 1 },
    {name: 'coverImgFile', maxCount: 1}
]);

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
            } else if (file.mimetype.startsWith('video')) {
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

const fileFilter = (req, file, callback) => {
    const MAX_IMG_SIZE = 2 * 1024 * 1024;
    const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
    const allowedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/quicktyme', 'video/x-matroska'];

    const maxSize = file.fieldname === 'posterFile' || file.fieldname === 'coverImgFile' ? MAX_IMG_SIZE : MAX_VIDEO_SIZE;

    if (file.fieldname === 'posterFile' || file.fieldname === 'coverImgFile') {
        if (!allowedImageTypes.includes(file.mimetype)) {
            console.log("bad image file type");
            return callback(new Error('Les fichiers images doivent être au format jpg, jpeg, png ou webp'), false);
        }
    } else {
        if (!allowedVideoTypes.includes(file.mimetype)) {
            console.log("bad video file type");
            return callback(new Error('Les fichiers vidéo doivent être au format mp4, mov ou mkv'), false);
        }
    }

    if (file.size > maxSize) {
        console.log("oversize file error");
        return callback(new Error(`Le fichier est trop volumineux. La taille maximale autorisée est de ${maxSize / (1024 * 1024)} Mo.`), false);
    }
    callback(null, true);
};

const uploadFiles = multer({
            storage: storage,
            fileFilter: fileFilter
        }).fields([
            { name: 'posterFile', maxCount: 1 },
            { name: 'trailerFile', maxCount: 1 },
            { name: 'coverImgFile', maxCount: 1 }
        ]);

module.exports = (req, res, next) => {
    uploadFiles(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: "file upload error", message: err.message});
        }

        next();
    });
}
const multer  = require('multer')
const util = require('util');
const ApiError = require('../utils/apiError');
const path = require('path');

const maxSize = 2 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '_' + file.originalname)
    }
})

const uploadImage = multer({ 
    storage, 
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new ApiError('Only image files are allowed (png, jpg, gif, jpeg)', undefined, undefined, 400))
        }
        callback(null, true)
    } 
}).single('file')

const uploadFile = multer({ 
    storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf' && ext !== '.xlsx' && ext !== '.csv' && ext !== '.txt' && ext != '.json' && ext != '.doc' && ext != '.docx' && ext != '.txt') {
            return callback(new ApiError('Unsupported file type. These types are allowed: png, jpg, gif, jpeg, pdf, xlsx, csv, txt ', undefined, undefined, 400))
        }
        callback(null, true)
    }
}).single('file')

const uploadImageMiddlware = util.promisify(uploadImage);
const uplaodFileMiddleware = util.promisify(uploadFile);

module.exports = { uploadImageMiddlware, uplaodFileMiddleware };

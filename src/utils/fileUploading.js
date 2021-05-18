"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname);
    }
});
exports.upload = multer({ storage: storage });
//# sourceMappingURL=fileUploading.js.map
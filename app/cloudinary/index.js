const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "dzorivc9n",
    api_key: "185316411275445",
    api_secret: "J5eUa43c5rC-xnmXcg5m79fuu6I"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Develope',
        allowed_formats: ['jpeg', 'jpg', 'png']
    },
});

module.exports = {
    cloudinary,
    storage
}
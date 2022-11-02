const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: "185316411275445",
    api_secret: "J5eUa43c5rC-xnmXcg5m79fuu6I"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'YelpCamp',
        allowed_formats: ['jpeg', 'jpg', 'png']
    },
});

module.exports = {
    cloudinary,
    storage
}
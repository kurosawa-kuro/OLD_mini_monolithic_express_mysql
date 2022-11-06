const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const multer = require('multer')

const microposts = require('../controllers/microposts');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isUser } = require('../middleware/isUser');


const { storage } = require('../cloudinary');

// Todo外部化
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'app/uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

const upload = multer({ storage })




router.route('/')
    .get(asyncHandler(microposts.index))
    .post(isLoggedIn, upload.array('image'), asyncHandler(microposts.createMicropost));

router.get('/new', isLoggedIn, microposts.renderNewForm);

router.route('/:id')
    .get(asyncHandler(microposts.showMicropost))
    .put(isLoggedIn, isUser, upload.array('image'), asyncHandler(microposts.updateMicropost))
    .delete(isLoggedIn, isUser, asyncHandler(microposts.deleteMicropost));

router.get('/:id/edit', isLoggedIn, isUser, asyncHandler(microposts.renderEditForm));

module.exports = router;

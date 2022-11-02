const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isUser } = require('../middleware/isUser');

const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })
// const upload = multer({ dest: 'app/uploads/' })


router.route('/')
    .get(asyncHandler(campgrounds.index))
    .post(isLoggedIn, upload.single('image'), asyncHandler(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(asyncHandler(campgrounds.showCampground))
    .put(isLoggedIn, isUser, upload.single('image'), asyncHandler(campgrounds.updateCampground))
    .delete(isLoggedIn, isUser, asyncHandler(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isUser, asyncHandler(campgrounds.renderEditForm));

module.exports = router;

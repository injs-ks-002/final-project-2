const express = require('express')
const router = express.Router()

const controllerPhotos = require('../controllers/photos.controller')

router.get('/photos', controllerPhotos.getPhotos)

module.exports = router
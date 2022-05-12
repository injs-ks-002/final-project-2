const express = require('express');
const router = express.Router();
const controller = require('../controllers/photos.controller')
//const middleware = require('../middelwares/auth')
router.use(express.json())

router.get('/', controller.getPhoto)
router.post('/', controller.postPhoto)
router.put('/:photoId', controller.updatePhoto)
router.delete('/:photoId', controller.deleteUser)
module.exports = router;
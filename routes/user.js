const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller')
router.use(express.json())

router.get('/', controller.getUser)
router.post('/', controller.postUser)
router.post('/register', controller.signUp);
router.post('/login', controller.signIn);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);
module.exports = router;
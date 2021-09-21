const express = require('express');
const router = express.Router();
const middleware_login = require('./middleware/login');
const users_controller = require('../controllers/users-controller.js');

router.get('/', users_controller.getUsers);

router.get('/:id_user',middleware_login, users_controller.getUser);

router.post('/login',users_controller.login);

router.post('/', users_controller.createUser);

router.put('/:id_user', middleware_login, users_controller.editUser);

router.delete('/:id_user', middleware_login, users_controller.deleteUser);

module.exports = router;
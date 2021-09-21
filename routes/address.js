const express = require('express');
const router = express.Router();
const middleware_login = require('./middleware/login');
const address_controller = require('../controllers/address-controller');

router.get('/', middleware_login, address_controller.getAllAddress);

router.get('/user/:id_user', middleware_login, address_controller.getAddressByUserID);

router.get('/:id_address', middleware_login, address_controller.getAddress);

router.post('/', middleware_login, address_controller.createAddress);

router.put('/:id_address', middleware_login, address_controller.editAddress);

router.delete('/:id_address', middleware_login, address_controller.deleteAddress);

module.exports = router;
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, orderController.placeOrder);


router.get('/:id', authMiddleware, orderController.getOrderById);


router.put('/:id', authMiddleware, orderController.updateOrderStatus);

module.exports = router;
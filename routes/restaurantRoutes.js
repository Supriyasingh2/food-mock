const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware,restaurantController.createRestaurant);


router.get('/', restaurantController.getAllRestaurants);


router.get('/:id', restaurantController.getRestaurantById);


router.get('/:id/menu', restaurantController.getRestaurantMenu);


router.post('/:id/menu', authMiddleware, restaurantController.addMenuItem);


router.delete('/:id/menu/:menuId', authMiddleware, restaurantController.deleteMenuItem);

module.exports = router;
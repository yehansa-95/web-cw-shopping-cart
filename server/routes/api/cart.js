const { Router } = require('express');
const cartController = require('../../controllers/cartControllers');
const router = Router();

router.get('/cart/:id',cartController.get_cart_items);
router.put('/cart/:id',cartController.add_cart_item);
router.put('/cart/remove/:id',cartController.remove_one_cart_item);
router.delete('/cart/:userId/:itemId',cartController.delete_item);

module.exports = router;
import express from "express";

import orderController from "../controllers/orderCtrl.js";

const router = express.Router();

router.get('/orders/:userid', orderController.getUserOrders)
router.post('/orders/', orderController.postOrder)






export default router;

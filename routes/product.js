import express from "express";

import productsController from "../controllers/productCtrl.js";

const router = express.Router();

router.get("/products", productsController.getProducts);
router.get("/product/:productid", productsController.getProduct);

export default router;

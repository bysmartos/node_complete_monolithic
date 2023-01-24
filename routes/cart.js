import express from "express";

import cartController from "../controllers/cartCtrl.js";
import { auth, verifyTokenAndAuthorization } from "../middlewares/auth.js";

const router = express.Router();


router.get("/cart/:userId", verifyTokenAndAuthorization , cartController.getCart);
router.post("/cart", auth ,cartController.postCart);
router.put("/cart/:productid", verifyTokenAndAuthorization ,cartController.deleteProductCart);
router.delete('/cart/:cartid', verifyTokenAndAuthorization,cartController.deleteCart);


export default router;
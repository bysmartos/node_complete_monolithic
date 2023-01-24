import { Router } from "express";
import userCtrl from "../controllers/userCtrl.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth.js";

const router = Router();

router.post("/:userid", verifyTokenAndAuthorization, userCtrl.updateUser);

router.delete("/:userid", verifyTokenAndAuthorization,userCtrl.deleteUser);

router.get("/:userid", verifyTokenAndAuthorization, userCtrl.getUser);



export default router;
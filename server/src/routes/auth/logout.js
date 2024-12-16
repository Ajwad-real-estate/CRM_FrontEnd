import { Router } from "express";
import handleLogout from "../../../controllers/auth/logout.controller.js";
import authorizeUser from "../../../middlewares/authorizeUser.js";

const router = Router();

router.delete("/logout", authorizeUser, handleLogout);

export default router;

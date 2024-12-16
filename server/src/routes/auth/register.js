import { Router } from "express";
import handleRegister from "../../../controllers/auth/register.controller.js";

const router = Router();

router.post("/register", handleRegister);

export default router;

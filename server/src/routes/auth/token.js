import { Router } from "express";
import handleToken from "../../../controllers/auth/token.controller.js";

const router = Router();

router.post("/token", handleToken);

export default router;

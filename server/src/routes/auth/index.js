import { Router } from "express";
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import refreshTokenRoute from "./token.js";
import logoutRoute from "./logout.js";
// import userData from "../SalesAgents/userData.js";

const router = Router();

router.use(registerRoute);
router.use(loginRoute);
router.use(refreshTokenRoute);
router.use(logoutRoute);
// router.use(userData)
export default router;

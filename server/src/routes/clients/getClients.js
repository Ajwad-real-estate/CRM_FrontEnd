import { Router } from "express";
// import getClients from "../../../controllers/clients/getClients.controller.js";
import getClients from "../../../controllers/clients/getClients.controller.js";
const router = Router();

router.get("/", getClients);

export default router;

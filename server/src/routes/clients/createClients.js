import { Router } from "express";
import createMultipleClients from "../../../controllers/clients/createClients.controller.js";

const router = Router();

router.post("/bulk", createMultipleClients);

export default router;

import { Router } from "express";
import getClientById from "../../../controllers/clients/getClientById.controller.js";


const router = Router();

router.get("/:clientId", getClientById);

export default router;

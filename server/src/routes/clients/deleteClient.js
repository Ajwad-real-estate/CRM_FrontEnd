import { Router } from "express";
import deleteClientById from "../../../controllers/clients/deleteClientById.controller.js";

const router = Router();

router.delete("/:clientId", deleteClientById);

export default router;

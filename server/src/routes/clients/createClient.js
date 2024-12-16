import { Router } from "express";
import createClient from "../../../controllers/clients/createClient.controller.js";

const router = Router();

router.post("/", createClient);

export default router;

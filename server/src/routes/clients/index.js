import { Router } from "express";
import authorizeUser from "../../../middlewares/authorizeUser.js";
import authorizeManager from "../../../middlewares/authorizeManager.js";
import createSingle from "./createClient.js";
import createMultiple from "./createClients.js";
import getClients from "./getClients.js";
import getClientById from "./getClientById.js";
import deleteClient from "./deleteClient.js";

const router = Router();

router.use(authorizeUser);

router.use(
    // authorizeManager
    // ,
    createSingle);
router.use(
    // authorizeManager,
    createMultiple);
router.use(getClients);
router.use(getClientById);
router.use(
    // authorizeManager,
    deleteClient);

export default router;

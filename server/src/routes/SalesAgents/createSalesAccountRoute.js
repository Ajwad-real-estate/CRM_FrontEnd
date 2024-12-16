import { Router } from "express";
// import authorizeUser from '../../middlewares/authorizeUser.js';
// import getSalesAgents from "../controllers/SalesAgents/getSalesAgents";
import createSalesAccount from "../../../controllers/SalesAgents/createSalesAccount.controller.js";
// import authenticate from "../middleware/authenticate.js"; // Middleware for token validation
// import getSalesAgentsMiddleWare from "../../../middlewares/getSalesAgents.js";
// const router = express.Router();
const router = Router();

// Route to fetch sales agent details (restricted to managers)
// router.get("/agents", getSalesAgentsMiddleWare, getSalesAgents);
router.post("/create-sales-account", createSalesAccount);

export default router;

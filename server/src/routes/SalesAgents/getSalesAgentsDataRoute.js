import { Router } from "express";
// import authorizeUser from '../../middlewares/authorizeUser.js';
// import getSalesAgents from "../controllers/SalesAgents/getSalesAgents";
import getSalesAgents from "../../../controllers/SalesAgents/getSalesAgents.controller.js";
// import authenticate from "../middleware/authenticate.js"; // Middleware for token validation
// import getSalesAgentsMiddleWare from "../../../middlewares/getSalesAgents.js";
// const router = express.Router();
const router = Router();

// Route to fetch sales agent details (restricted to managers)
// router.get("/agents", getSalesAgentsMiddleWare, getSalesAgents);
router.get("/get-sales-agents-details", getSalesAgents);

export default router;

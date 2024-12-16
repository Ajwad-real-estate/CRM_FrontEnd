import { Router } from "express";
import authorizeUser from '../../middlewares/authorizeUser.js';
import getDashboard from '../../controllers/dashboard/dashboardController.js';

const router = Router ();

// router.use(authorizeUser);

router.get('/dashboard', getDashboard);



export default router;

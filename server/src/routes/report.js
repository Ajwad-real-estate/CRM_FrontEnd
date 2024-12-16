const express = require('express');
const router = express.Router();

const { getreport } = require('../../controllers/reportController');

router.get('/dashboard', getreport);



export default router;

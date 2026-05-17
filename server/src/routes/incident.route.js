import express from 'express'
import { getMonitorIncidents, getAllIncidents, getOpenIncidents } from '../controllers/incident.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = express.Router();

router.use(authenticate);

router.get("/incidents", getAllIncidents);
router.get("/incidents/open", getOpenIncidents);
router.get("/monitors/:id/incidents", getMonitorIncidents);

export default router;
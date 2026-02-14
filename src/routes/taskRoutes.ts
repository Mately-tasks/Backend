import { Router } from 'express';
import { getTasks, startSimulation } from '../controllers/taskController';

const router = Router();

router.get('/tasks', getTasks);
router.post('/simulate', startSimulation);

export default router;
import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

// GET /tasks?after=<date>
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const after = req.query.after as string | undefined;
    if (!after) {
      res.status(400).json({ message: 'Date parameter is required' });
      return;
    }
    const tasks = await taskService.fetchTasksAfterDate(after);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /simulate
export const startSimulation = (req: Request, res: Response): void => {
  taskService.runSimulation().catch(err => console.error(err));

  res.status(202).json({ 
    message: 'Simulation started. 10 tasks will be created in 50 seconds.' 
  });
};
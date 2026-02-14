import Task, { ITask } from '../models/Task';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulation of task creation
 */
export const runSimulation = async (): Promise<void> => {
  console.log('Démarrage de la simulation');
  
  const totalTasks = 10; // max 10 tasks
  const delay = 5000; // 5 seconds delay between tasks
  const users =['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10']; // 10 users
  const titles = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6', 'Task 7', 'Task 8', 'Task 9', 'Task 10']; // 10 titles
  const statuses = ['todo', 'in_progress', 'done']; // 3 statuses

  
  
  for (let i = 1; i <= totalTasks; i++) {
    try {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      
      await Task.create({
        user: randomUser, 
        title: randomTitle, 
        status: randomStatus,
        createdAt: new Date()
      });
      
      console.log(`Task ${i}/${totalTasks} created: [${randomStatus}] ${randomTitle} by ${randomUser}`);
      
      if (i < totalTasks) {
        await sleep(delay);
      }
    } catch (error) {
      console.error(`Error creating task ${i}:`, error);
    }
  }
  
  console.log('Simulation finished');
};

/**
 * Fetch tasks after a given date
 */
export const fetchTasksAfterDate = async (dateParam: string | undefined): Promise<ITask[]> => {
  const query: { createdAt?: { $gt: Date } } = {};
  
  if (dateParam) {
    const parsedDate = new Date(dateParam);
    if (!isNaN(parsedDate.getTime())) {
      query.createdAt = { $gt: parsedDate };
    }
  }

  return await Task.find(query)
    .sort({ createdAt: 1 })
    .limit(20)
    .select('user title status createdAt')
    .catch(error => {
      console.error('Error fetching tasks:', error);
      return [];
    })
};
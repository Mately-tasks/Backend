import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  user: string; // add userName for good UX
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  createdAt: Date;
}

// Definition of the Mongoose Schema
const TaskSchema: Schema = new Schema({
  user: { 
    type: String, 
    required: true,
    trim: true 
  },
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['todo', 'in_progress', 'done'], 
    default: 'todo' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

TaskSchema.index({ createdAt: 1 });

export default mongoose.model<ITask>('Task', TaskSchema);
import mongoose, { Document } from "mongoose";

interface SubTask {
  title: string;
  isCompleted: boolean;
}

interface Task extends Document {
  title: string;
  description: string;
  status: string;
  subtasks: SubTask[];
}

interface Column extends Document {
  name: string;
  tasks: Task[];
}

interface Board extends Document {
  name: string;
  columns: Column[];
}

const subtaskSchema = new mongoose.Schema<SubTask>({
  title: String,
  isCompleted: Boolean
}).set('toJSON', {
  virtuals: true,
});

const taskSchema = new mongoose.Schema<Task>({
  title: String,
  description: String,
  status: String,
  subtasks: [subtaskSchema],
}).set('toJSON', {
  virtuals: true,
});

const columnSchema = new mongoose.Schema<Column>({
  name: String,
  tasks: [taskSchema]
}).set('toJSON', {
  virtuals: true,
});

const boardSchema = new mongoose.Schema<Board>({
  name: String,
  columns: [columnSchema]
}, { collection: 'boards' }).set('toJSON', {
  virtuals: true,
});

export const Subtask = mongoose.model('Subtask', subtaskSchema);
export const Task = mongoose.model('Task', taskSchema);
export const Column = mongoose.model('Column', columnSchema);
export const Board = mongoose.model('Board', boardSchema);

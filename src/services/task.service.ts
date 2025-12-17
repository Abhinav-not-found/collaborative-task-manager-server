import {
  createTask,
  deleteTaskById,
  findAllTasks,
  findTaskById,
} from "../repositories/task.repo"
import Task, { ITask } from "../models/task.model"

export const taskService = {
  createNewTask: async (data: {
    title: string
    description: string
    dueDate: Date
    creatorId: string
  }): Promise<ITask> => {
    return createTask(data)
  },

  getAllTasks: async (): Promise<ITask[]> => {
    return findAllTasks()
  },

  getTaskById: async (id: string): Promise<ITask | null> => {
    return findTaskById(id)
  },

  updateTask: async (
    id: string,
    data: Partial<{
      title: string
      description: string
      dueDate: Date
      priority: "Low" | "Medium" | "High" | "Urgent"
      status: "To Do" | "In Progress" | "Review" | "Completed"
    }>
  ): Promise<ITask | null> => {
    return Task.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    )
  },

  deleteTask: async (id: string): Promise<ITask | null> => {
    return deleteTaskById(id)
  },
}

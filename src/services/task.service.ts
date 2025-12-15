import { createTask, deleteTaskById, findAllTasks, findTaskById } from "../repositories/task.repo"
import { ITask } from "../models/task.model"

export const taskService = {
  createNewTask: async (data: { title: string; description: string; dueDate: Date, creatorId:string }): Promise<ITask> => {
    return createTask(data)
  },

  getAllTasks: async (): Promise<ITask[]> => {
    return findAllTasks()
  },

  getTaskById: async (id: string): Promise<ITask | null> => {
    return findTaskById(id)
  },

  updateTask: async (id: string, data: { title: string; description: string; dueDate: Date }): Promise<ITask | null> => {
    const task = await findTaskById(id)
    if (!task) return null
    task.title = data.title
    task.description = data.description
    task.dueDate = data.dueDate
    await task.save()
    return task
  },

   deleteTask: async (id: string): Promise<ITask | null> => {
    return deleteTaskById(id)
  }
}


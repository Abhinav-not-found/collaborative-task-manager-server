import Task, { ITask } from "../models/task.model"

export const createTask = async (data: {
  title: string
  description: string
  dueDate: Date
}): Promise<ITask> => {
  return Task.create(data)
}

export const findAllTasks = async (): Promise<ITask[]> => {
  return Task.find()
}

export const findTaskById = async (id: string): Promise<ITask | null> => {
  return Task.findById(id)
}

export const deleteTaskById = async (id: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(id)
}

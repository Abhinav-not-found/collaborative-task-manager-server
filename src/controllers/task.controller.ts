import { Request, Response, NextFunction } from "express"
import { taskService } from "../services/task.service"

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if(!req.user) {
      return res.status(401).json({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      })
    }
    
    const { title, description, dueDate } = req.body

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        code: "MISSING_FIELDS",
        message: "All fields are required",
      })
    }

    const task = await taskService.createNewTask({
      title,
      description,
      dueDate: new Date(dueDate),
      creatorId: req.user.id,
    })

    res.status(201).json({ message: "Task Created", data: task })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await taskService.getAllTasks()
    res.status(200).json({ data: tasks })
  } catch (error) {
    next(error)
  }
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const task = await taskService.getTaskById(id)

    if (!task) {
      return res.status(404).json({
        code: "NOT_FOUND",
        message: "Task not found",
      })
    }

    res.status(200).json({ data: task })
  } catch (error) {
    next(error)
  }
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { title, description, dueDate } = req.body

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        code: "MISSING_FIELDS",
        message: "All fields are required",
      })
    }

    const updatedTask = await taskService.updateTask(id, {
      title,
      description,
      dueDate: new Date(dueDate),
    })

    if (!updatedTask) {
      return res.status(404).json({
        code: "NOT_FOUND",
        message: "Task not found",
      })
    }

    res.status(200).json({ message: "Task Updated", data: updatedTask })
  } catch (error) {
    next(error)
  }
}

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const deletedTask = await taskService.deleteTask(id)

    if (!deletedTask) {
      return res.status(404).json({
        code: "NOT_FOUND",
        message: "Task not found",
      })
    }

    res.status(200).json({ message: "Task Deleted", data: deletedTask })
  } catch (error) {
    next(error)
  }
}

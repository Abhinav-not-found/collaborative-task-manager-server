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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const updateData: any = {}

    if (req.body.title !== undefined) updateData.title = req.body.title
    if (req.body.description !== undefined)
      updateData.description = req.body.description

    if (req.body.dueDate !== undefined) {
      const date = new Date(req.body.dueDate)
      if (isNaN(date.getTime())) {
        return res.status(400).json({ message: "Invalid dueDate" })
      }
      updateData.dueDate = date
    }

    if (req.body.priority !== undefined)
      updateData.priority = req.body.priority

    if (req.body.status !== undefined)
      updateData.status = req.body.status

    const updatedTask = await taskService.updateTask(id, updateData)

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

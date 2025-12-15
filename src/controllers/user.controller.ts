import { Request, Response, NextFunction } from "express"
import { userService } from "../services/user.service"
import { AuthRequest } from "../types/express"

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body
    const user = await userService.registerUser(name, email, password)
    res
      .status(201)
      .json({
        message: "User Registered",
        data: { id: user._id, name: user.name, email: user.email },
      })
  } catch (error: any) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const { user, token } = await userService.loginUser(email, password)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    })

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    next(error)
  }
}

export const getUserInfo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" })

    const user = await userService.getUserById(req.user.id)
    res
      .status(200)
      .json({ data: { id: user._id, name: user.name, email: user.email } })
  } catch (error: any) {
    next(error)
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    res.status(200).json({ message: "Logged out" })
  } catch (error) {
    next(error)
  }
}

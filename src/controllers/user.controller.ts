import User from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Response, Request, NextFunction } from "express"

import ENV from "../lib/env"
import { AuthRequest } from "../types/express"

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({
        code: "MISSING_FIELDS",
        message: "All fields are required",
      })
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
      return res.status(400).json({
        code: "EMAIL_EXISTS",
        message: "Email already registered",
      })
    }

    const newUser = await User.create({
      name,
      email,
      password,
    })

    res.status(201).json({ message: "User Registered" })
  } catch (error) {
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

    if (!email || !password) {
      return res.status(400).json({
        code: "MISSING_FIELDS",
        message: "All fields are required",
      })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      })
    }

    const token = jwt.sign(
      { id: user._id},
      ENV.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
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
  } catch (error) {
    next(error)
  }
}

export const getUserInfo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ data: user })
  } catch (error) {
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
      secure: false,
      sameSite: "strict",
    })
    res.status(200).json({ message: "Logged out" })
  } catch (error) {
    next(error)
  }
}

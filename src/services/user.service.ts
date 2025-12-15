import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import ENV from "../lib/env"
import { IUser } from "../models/user.model"
import { findUserByEmail, findUserById, createUser } from "../repositories/user.repo"

export const userService = {

  registerUser: async (name: string, email: string, password: string): Promise<IUser> => {
    if (!name || !email || !password) throw new Error("All fields are required")

    const existing = await findUserByEmail(email)
    if (existing) throw new Error("Email already registered")

    return createUser({ name, email, password })
  },

  loginUser: async (email: string, password: string) => {
    if (!email || !password) throw new Error("All fields are required")

    const user = await findUserByEmail(email)
    if (!user) throw new Error("email credentials")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error("password credentials")

    const token = jwt.sign(
      { id: user._id, email: user.email },
      ENV.JWT_SECRET,
      { expiresIn: "1h" }
    )

    return { user, token }
  },

  getUserById: async (id: string): Promise<IUser> => {
    const user = await findUserById(id)
    if (!user) throw new Error("User not found")
    return user
  }
}

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import ENV from "../lib/env"
import { findUserByEmail, findUserById, createUser } from "../repositories/user.repo"
import { IUser } from "../models/user.model"

export const registerUser = async (name: string, email: string, password: string): Promise<IUser> => {
  if (!name || !email || !password) throw new Error("All fields are required")

  const existing = await findUserByEmail(email)
  if (existing) throw new Error("Email already registered")

  return createUser({ name, email, password })
}

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("All fields are required")

  const user = await findUserByEmail(email)
  if (!user) throw new Error("Invalid credentials")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid credentials")

  const token = jwt.sign({ userId: user._id, email: user.email }, ENV.JWT_SECRET, { expiresIn: "1h" })

  return { user, token }
}

export const getUserById = async (id: string): Promise<IUser> => {
  const user = await findUserById(id)
  if (!user) throw new Error("User not found")
  return user
}

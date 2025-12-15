import User, { IUser } from "../models/user.model"

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email })
}

export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id)
}

export const createUser = async (data: {
  name: string
  email: string
  password: string
}): Promise<IUser> => {
  return User.create(data)
}

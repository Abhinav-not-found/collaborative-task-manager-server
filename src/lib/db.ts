import mongoose, { Mongoose } from "mongoose"
import chalk from "chalk"
import ENV from "./env"

const connectDB = async (): Promise<Mongoose> => {
  if (!ENV.MONGO_URI) {
    throw new Error("MONGO_URI is not defined")
  }

  try {
    const conn = await mongoose.connect(ENV.MONGO_URI)
    console.log(chalk.bgGreen("Database connected"))
    return conn
  } catch (error: unknown) {
    let message = "Unknown database error"

    if (error instanceof Error) {
      message = error.message
    }

    if (
      message.includes("bad auth") ||
      message.includes("Authentication failed")
    ) {
      console.error(
        chalk.bgYellow(
          "Invalid MongoDB URI. Please update your .env file before starting the server."
        )
      )
    } else if (message.includes("ENOTFOUND")) {
      console.error(
        chalk.bgRed(
          "MongoDB host not found. Check your internet connection or cluster name."
        )
      )
    } else {
      console.error(`Database Error: ${message}`)
    }

    process.exit(1)
  }
}

export default connectDB

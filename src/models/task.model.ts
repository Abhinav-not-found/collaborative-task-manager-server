import mongoose, { Schema, Document, Model } from "mongoose"

export interface ITask extends Document {
  title: string
  description?: string
  dueDate?: Date
  priority: "Low" | "Medium" | "High" | "Urgent"
  status: "To Do" | "In Progress" | "Completed" | "Review"
  creatorId: mongoose.Types.ObjectId
  assignedToId?: mongoose.Types.ObjectId
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      maxlength: [100, "Max 100 characters allowed"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    dueDate: {
      type: Date,
      validate: {
        validator: (value: Date) => !value || value > new Date(),
        message: "Due date must be in the future",
      },
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed", "Review"],
      default: "To Do",
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedToId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
)

taskSchema.index({ creatorId: 1 })
taskSchema.index({ assignedToId: 1 })
taskSchema.index({ status: 1, dueDate: 1 })

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema)

export default Task

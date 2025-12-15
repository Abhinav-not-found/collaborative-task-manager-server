import { Router } from "express"
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/task.controller"
import authenticateToken from "../middlewares/user.middleware"

const router = Router()
router.use(authenticateToken)


router.get("/check", (req, res) => {
  res.send("Task route is working")
})

router.post("/create", create)
router.get("/getAll", getAll)
router.get("/getOne/:id", getOne)
router.put("/update/:id", update)
router.delete("/remove/:id", remove)


export default router

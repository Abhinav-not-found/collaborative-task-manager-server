import { Router } from "express"
import {
  login,
  register,
  getUserInfo,
  logout,
} from "../controllers/user.controller"
import authenticateToken from "../middlewares/user.middleware"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getUserInfo", authenticateToken, getUserInfo)

router.get("/check", (req, res) => {
  res.send("User route is working")
})

export default router

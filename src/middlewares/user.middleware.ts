import jwt from "jsonwebtoken"
import ENV from "../lib/env"
import { Response, NextFunction } from "express"
import { JwtPayload } from "../types/jwt"
import { AuthRequest } from "../types/express"

function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }
  try {
    const decoded = jwt.verify(
      token,
      ENV.JWT_SECRET
    ) as JwtPayload

    req.user = decoded
    next()
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}
export default authenticateToken

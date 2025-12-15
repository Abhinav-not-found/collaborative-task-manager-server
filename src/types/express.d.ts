// src/types/express.d.ts
import { JwtPayload } from "./jwt"

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

import { Request } from "express"

export interface AuthRequest extends Request {
  user?: JwtPayload
}


import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import ENV from "./lib/env";
import userRouter from "./routes/user.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is running');
});
app.use("/user", userRouter);

app.use(
  (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (err instanceof Error) {
      console.error(err.stack);
    } else {
      console.error("Unknown error:", err);
    }

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
);

export default app;

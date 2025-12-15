import chalk from "chalk";
import app from "./app"
import connectDB from "./lib/db";
import ENV from "./lib/env"

async function startServer() {
  try {
    await connectDB(); 

    app.listen(ENV.PORT, () => {
      console.log(chalk.bgCyan(`Server running on port ${ENV.PORT}`));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

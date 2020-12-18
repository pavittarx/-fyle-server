import express from "express";
import dotenv from "dotenv";

import BanksRouter from "./routes/banks";
import BranchesRouter from "./routes/branches";

const app = express();
dotenv.config();

app.use('/api/branches', BranchesRouter);
app.use('/api/banks', BanksRouter);

app.get("/", (req, res) => {
  res.status(400);
  res.json({
    message: "Welcome to Fylebank",
  });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Server Ready at ${
      process.env.PORT ? process.env.DEPLOY_URL : "https://localhost:3000"
    }`
  )
);

export default app;
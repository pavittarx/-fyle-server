import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import BanksRouter from "./routes/banks";
import BranchesRouter from "./routes/branches";

const app = express();

dotenv.config();
app.use(cors());

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
    `Server Ready at [Development Only]: ${
      process.env.PORT ? 'https://localhost:'+process.env.PORT : 'https://localhost:3000' }`
  )
);

export default app;
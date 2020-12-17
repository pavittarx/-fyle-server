import express from "express";
import { getBanksForQuery } from "./pg/functions/autocomplete";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.status(400);
  res.json({
    message: "Welcome to Fylebank",
  });
});

/***
 * Autocomplete Query
 * Order by: IFSC
 * limit & offset params
 * */

app.get("/api/branches/autocomplete", async (req, res) => {
  type params = {
    q?: string;
    limit?: number;
    offset?: number;
  };

  const { q, limit, offset }: params = req.query;

  const result = await getBanksForQuery(
    q!,
    limit ? limit : 10,
    offset ? offset : 0
  );

  res.json(result);
});

app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Server Ready at ${
      process.env.PORT ? process.env.DEPLOY_URL : "https://localhost:3000"
    }`
  )
);

export default app;
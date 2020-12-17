import express from "express";

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

app.get("/api/branches/autocomplete", (req, res) => {
  type params = {
    q?: string;
    limit?: string;
    offset?: string;
  };

  

  const { q, limit, offset }: params = req.query;
  console.log(req.params);

  res.json(req.query);
});

app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Server Ready at ${
      process.env.PORT ? process.env.DEPLOY_URL : "https://localhost:3000"
    }`
  )
);

export default app;
/**
 * Routes for /api/branches
 */

import express from "express";
import {
  getBanksForAutocompleteQuery,
  getBanksForQuery,
} from "./../pg/functions/branches";

const router = express.Router();

router.use((req, res, next) => {
  console.log("[Server]: Inside /api/branches");

  next();
});

/***
 * @param q: string
 * @param limit: number (optional)
 * @param offset: number (optional)
 *
 * Route: /api/branches/autocomplete
 * Ordered by: IFSC
 * */

type Params = {
  q?: string;
  limit?: number;
  offset?: number;
};

router.get("/autocomplete", async (req, res) => {
  const { q, limit, offset }: Params = req.query;

  const result = await getBanksForAutocompleteQuery(
    q!,
    limit ? limit : 10,
    offset ? offset : 0
  );

  res.json(result);
});

router.get("/", async (req, res) => {
  const { q, limit, offset }: Params = req.query;

  const result = await getBanksForQuery(
    q!,
    limit ? limit : 10,
    offset ? offset : 0
  );

  res.json(result);
});

export default router;
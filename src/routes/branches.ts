/**
 * Routes for /api/branches
 */

import express from "express";
import {
  getBanksForQuery,
  getBanksForAutocompleteQuery,
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

  const branches = await getBanksForAutocompleteQuery(q, limit, offset);

  res.json({ branches });
});

router.get("/", async (req, res) => {
  const { q, limit, offset }: Params = req.query;

  const branches = await getBanksForQuery(q!, limit, offset);

  res.json({ branches });
});

export default router;

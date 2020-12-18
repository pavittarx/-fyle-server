import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  console.log("[Server]: Inside /api/banks");
  next();
});

router.get("/:id", (req, res) => {
  res.json({ bank: "" });
});

export default router;
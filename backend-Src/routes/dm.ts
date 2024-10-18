import express, { Request, Response, Router } from "express";
import { Dm } from "../interfaces/Dm.js";
import { creatDm } from "../mongoDb/Dm/creatDm.js";
import { isValidDm } from "../data/validation/validationDmMessage.js";

export const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const newDm: Dm = req.body;

  if (isValidDm(newDm)) {
    try {
      await creatDm(newDm);
      res.sendStatus(201);
    } catch (error) {
      console.error("Error inserting DM:", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

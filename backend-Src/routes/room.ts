import express, { Response, Router } from "express";
import { WithId } from "mongodb";
import { Room } from "../interfaces/Room.js";
import { getAllRooms } from "../mongoDb/Room/getAllRooms.js";

export const router: Router = express.Router();

router.get("/", async (_, res: Response<WithId<Room>[]>) => {
  try {
    const rooms: WithId<Room>[] = await getAllRooms();
    if (!rooms || rooms.length === 0) {
      res.sendStatus(404);
    }
    res.send(rooms);
  } catch (error) {
    res.sendStatus(500);
  }
});

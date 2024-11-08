import express, { Response, Router, Request } from "express";
import { WithId } from "mongodb";
import { Room } from "../interfaces/Room.js";
import { getAllRooms } from "../mongoDb/Room/getAllRooms.js";
import { creatRoom } from "../mongoDb/Room/creatRoom.js";
import { isValidRoom } from "../data/validation/validationRoom.js";
import { deleteRoom } from "../mongoDb/Room/deleteRoom.js";

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
router.post("/", async (req: Request, res: Response) => {
  const newRoom: Room = req.body;

  if (isValidRoom(newRoom)) {
    try {
      await creatRoom(newRoom);
      res.sendStatus(201);
    } catch (error) {
      console.error("Error inserting Room:", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});
router.delete("/delete/:name", async (req: Request, res: Response) => {
  try {
    const roomName = req.params.name;
    if (!roomName) {
      res.status(400).send({ error: "Room name is required" });
      return;
    }
    const result = await deleteRoom(roomName);

    if (result?.deletedCount !== undefined && result.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ error: "Room not found" });
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    res.sendStatus(500);
  }
});

import express, { Response, Router, Request } from "express";
import { ObjectId, WithId } from "mongodb";
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
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.sendStatus(400);
      return;
    }
    const objectId = new ObjectId(id);
    const result = await deleteRoom(objectId);

    if (result?.deletedCount !== undefined && result.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error deleting user", error);
    res.sendStatus(500);
  }
});

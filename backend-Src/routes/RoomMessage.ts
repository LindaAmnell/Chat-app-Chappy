import express, { Request, Response, Router } from "express";
import { WithId } from "mongodb";
import { MessageRoom } from "../interfaces/MessageRoom.js";
import { isValidRoomMessage } from "../data/validation/valodateRoomMessage.js";
import { getAllRoomMessage } from "../mongoDb/RoomMessage/getAllRoomMessage.js";
import { creatRoomMessage } from "../mongoDb/RoomMessage/creatRoomMessage.js";

export const router: Router = express.Router();

router.get("/", async (_, res: Response<WithId<MessageRoom>[]>) => {
  try {
    const dmsRoom: WithId<MessageRoom>[] = await getAllRoomMessage();
    if (!dmsRoom || dmsRoom.length === 0) {
      res.sendStatus(404);
    }
    res.send(dmsRoom);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newDmRoom: MessageRoom = req.body;

  if (isValidRoomMessage(newDmRoom)) {
    try {
      await creatRoomMessage(newDmRoom);
      res.sendStatus(201);
    } catch (error) {
      console.error("Error inserting Message Rooms:", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

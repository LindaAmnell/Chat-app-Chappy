import express, { Request, Response, Router } from "express";
import { WithId } from "mongodb";
import { MessageRoom } from "../interfaces/MessageRoom.js";
import { isValidRoomMessage } from "../data/validation/valodateRoomMessage.js";
import { getAllRoomMessage } from "../mongoDb/RoomMessage/getAllRoomMessage.js";
import { creatRoomMessage } from "../mongoDb/RoomMessage/creatRoomMessage.js";
import { deleteRoomMessage } from "../mongoDb/RoomMessage/deleteRoomMessage.js";
import { updatedRoomMessages } from "../mongoDb/RoomMessage/updatedRoomMessage.js";

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
router.put(
  "/update-user-messages",
  async (req: Request, res: Response): Promise<void> => {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
      res.status(400).send({ error: "Old name and new name are required." });
      return;
    }

    try {
      const result = await updatedRoomMessages(oldName, newName);

      if (result.matchedCount === 0) {
        console.log("No messages found to update.");
        res.status(404).send({ message: "No messages found to update." });
        return;
      }
      res
        .status(200)
        .send({ message: `Updated ${result.matchedCount} messages.` });
    } catch (error) {
      console.error("Error updating user messages:", error);
      res.sendStatus(500);
    }
  }
);

router.delete("/delete-message", async (req: Request, res: Response) => {
  const { name } = req.body;
  console.log("namn", name);

  if (!name) {
    res.sendStatus(400);
    return;
  }

  try {
    const result = await deleteRoomMessage(name);

    if (result?.acknowledged) {
      if (result.deletedCount > 0) {
        res.sendStatus(204);
      } else {
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error deleting message", error);
    res.sendStatus(500);
  }
});

import express, { Response, Router, Request } from "express";
import { ObjectId, WithId } from "mongodb";
import { User } from "../interfaces/User.js";
import { getAllUser } from "../mongoDb/User/getAllUser.js";
import { getOneUser } from "../mongoDb/User/getOneUser.js";

export const router: Router = express.Router();

router.get("/", async (_, res: Response<WithId<User>[]>) => {
  try {
    const users: WithId<User>[] = await getAllUser();
    if (!users || users.length === 0) {
      res.sendStatus(404);
    }
    res.send(users);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  console.log("hej");
  try {
    console.log("hej, då");
    const id: string = req.params.id;
    const objectId: ObjectId = new ObjectId(id);
    const user: WithId<User>[] = await getOneUser(objectId);
    if (user.length < 1) {
      res.status(404);
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500);
  }
});

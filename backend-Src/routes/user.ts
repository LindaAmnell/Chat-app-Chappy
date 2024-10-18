import express, { Response, Router, Request } from "express";
import { ObjectId, WithId } from "mongodb";
import { User } from "../interfaces/User.js";
import { getAllUser } from "../mongoDb/User/getAllUser.js";
import { getOneUser } from "../mongoDb/User/getOneUser.js";
import { searchUser } from "../mongoDb/User/searchUser.js";
import { isValidUser } from "../data/validation/validationUser.js";
import { creatUser } from "../mongoDb/User/creatUser.js";
import { deleteUser } from "../mongoDb/User/deleteUser.js";

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

router.get("/search", async (req, res) => {
  const name: string = req.query.q as string;
  if (!name.trim()) {
    res.status(400);
  }
  try {
    const searchResult = await searchUser(name);
    if (searchResult.length === 0) {
      res.status(404).send("No user found");
    } else {
      res.json(searchResult);
    }
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500);
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

router.post("/", async (req: Request, res: Response) => {
  const newUser: User = req.body;
  if (isValidUser(newUser)) {
    try {
      await creatUser(newUser);
      res.sendStatus(201);
    } catch (error) {
      console.error("Error inserting DM:", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.sendStatus(400);
    }
    const objectId: ObjectId = new ObjectId(id);
    const result = await deleteUser(objectId);
    if (result?.deletedCount === 0) {
      res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("wrong with deleting user", error);
    res.sendStatus(500);
  }
});

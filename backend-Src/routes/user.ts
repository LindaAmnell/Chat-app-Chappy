import express, { Response, Router, Request } from "express";
import { ObjectId, WithId } from "mongodb";
import { User } from "../interfaces/User.js";
import jwt from "jsonwebtoken";
import { getAllUser } from "../mongoDb/User/getAllUser.js";
import { getOneUser } from "../mongoDb/User/getOneUser.js";
import { searchUser } from "../mongoDb/User/searchUser.js";
import { isValidUser } from "../data/validation/validationUser.js";
import { creatUser } from "../mongoDb/User/creatUser.js";
import { deleteUser } from "../mongoDb/User/deleteUser.js";
import { validateLogin } from "../data/validation/validateLogin.js";

export const router: Router = express.Router();

const { sign } = jwt;

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

router.post("/login", async (req: Request, res: Response) => {
  console.log("går in i post");
  if (!process.env.SECRET) {
    res.sendStatus(500);
    return;
  }
  console.log("Body är: ", req.body);
  const userId = await validateLogin(req.body.username, req.body.password);
  console.log("user id: ", userId);

  if (!userId) {
    res.status(401).send({
      error: "Unauthorized",
      message: "You are not authorized to access this resource.",
    });
    return;
  }
  const payload = {
    userId,
  };
  const token: string = sign(payload, process.env.SECRET);
  res.send({ jwt: token });
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

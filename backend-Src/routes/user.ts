import express, { Response, Router, Request } from "express";
import { ObjectId, WithId } from "mongodb";
import { User } from "../interfaces/User.js";
import jwt from "jsonwebtoken";
import { getAllUser } from "../mongoDb/User/getAllUser.js";
import { getOneUser } from "../mongoDb/User/getOneUser.js";
import { searchUser } from "../mongoDb/User/searchUser.js";
import {
  isValidChangeUser,
  isValidUser,
} from "../data/validation/validationUser.js";
import { creatUser } from "../mongoDb/User/creatUser.js";
import { deleteUser } from "../mongoDb/User/deleteUser.js";
import { validateLogin } from "../data/validation/validateLogin.js";
import { updateUser } from "../mongoDb/User/updateUser.js";
import { Payload } from "./dm.js";
export const router: Router = express.Router();

const { sign, verify } = jwt;

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
  if (!process.env.SECRET) {
    res.sendStatus(500);
    return;
  }
  const userId = await validateLogin(req.body.username, req.body.password);

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

router.post("/", async (req: Request, res: Response) => {
  const newUser: User = req.body;
  const users = await getAllUser();
  const usernameAvailability = users.find((user) => user.name === newUser.name);
  if (usernameAvailability) {
    res.sendStatus(409);
  } else if (isValidUser(newUser) && usernameAvailability === undefined) {
    try {
      await creatUser(newUser);
      res.sendStatus(201);
    } catch (error) {
      console.error("Error inserting user:", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

router.get("/activeuser", async (req: Request, res: Response) => {
  if (!process.env.SECRET) {
    res.sendStatus(500);
    return;
  }
  let token = req.headers.authorization;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  let payload: Payload;

  try {
    payload = verify(token, process.env.SECRET) as Payload;
  } catch (error) {
    res.sendStatus(400);
    return;
  }
  let username: string = payload.userId;
  if (username) {
    res.send(username);
  } else {
    res.sendStatus(400);
  }
});

router.put(
  "/change-user/:id",
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const newUser: User = req.body;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(400);
      return;
    }
    const objectId: ObjectId = new ObjectId(id);
    try {
      const users = await getAllUser();
      const usernameExists = users.some(
        (user) => user.name.toLowerCase() === newUser.name?.toLowerCase()
      );
      if (usernameExists) {
        res.status(409).json({ message: "Username already taken." });
        return;
      }
      const updatedFields: User = req.body;
      if (isValidChangeUser(updatedFields)) {
        const result = await updateUser(objectId, newUser);

        if (result?.matchedCount === 0) {
          res.status(404).json({ message: "User not found." });
          return;
        }
        if (newUser.name && process.env.SECRET) {
          const newToken = jwt.sign(
            { userId: newUser.name },
            process.env.SECRET
          );
          res.status(200).json({ token: newToken });
        } else {
          res.sendStatus(204);
        }
      }
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "An error occurred." });
    }
  }
);

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.sendStatus(400);
      return;
    }
    const objectId = new ObjectId(id);
    const result = await deleteUser(objectId);

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

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const objectIds: ObjectId = new ObjectId(id);
    const user: WithId<User>[] = await getOneUser(objectIds);
    if (user.length < 1) {
      res.status(404);
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500);
  }
});

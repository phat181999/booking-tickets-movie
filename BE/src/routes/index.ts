import { Router } from "express";
import {
  getUers,
  createUser,
  getUserId,
  deteleUser,
  updateUser,
} from "../controller/user.controller";
const router = Router();

router.get("/get-all-users", getUers);
router.post("/create-user", createUser);
router.get("/get-user/:id", getUserId);
router.delete("/delete-user/:id", deteleUser);
router.put("/update-user/:id", updateUser);
export default router;

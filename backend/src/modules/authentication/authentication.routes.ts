import { Router } from "express";
import {
  getCheckUsernameAndEmailController,
  postRegisterUserController,
} from "./authentication.controller";

const router = Router();

router.post("/register", postRegisterUserController);
router.get("/checkavailability", getCheckUsernameAndEmailController);

export default router;

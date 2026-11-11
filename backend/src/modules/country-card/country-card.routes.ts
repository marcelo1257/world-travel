import { Router } from "express";
import { getCountryCardBackgroundController } from "./country-card.controller";

const router = Router();

router.get("/backgrounds", getCountryCardBackgroundController);

export default router;

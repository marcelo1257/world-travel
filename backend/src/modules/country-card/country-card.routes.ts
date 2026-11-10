import { Router } from "express";
import { getCountryCardController } from "./country-card.controller";

const router = Router();

router.get("/", getCountryCardController);

export default router;

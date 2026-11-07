import { Router } from "express";
import { getCountriesController } from "./countries.controller";

const router = Router();

router.get("/", getCountriesController);

export default router;

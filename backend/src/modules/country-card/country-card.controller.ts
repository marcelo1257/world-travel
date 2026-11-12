import { Request, Response } from "express";
import { getBackgoundImages } from "./country-card.service";

export async function getCountryCardBackgroundController(
  req: Request,
  res: Response,
) {
  try {
    const backgroundList = await getBackgoundImages();

    return res.status(200).json(backgroundList.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error retrieving country card background",
    });
  }
}

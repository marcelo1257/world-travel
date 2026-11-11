import { Request, Response } from "express";

export async function getCountryCardBackgroundController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    console.log("getCountryCardBackgroundController");

    res.status(200).json();
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving country card background",
    });
  }
}

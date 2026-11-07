import { Request, Response } from "express";
import { getCountries } from "./countries.service";

export async function getCountriesController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const countries = await getCountries();

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving countries",
    });
  }
}

import { Request, Response } from "express";
import { CountriesQueryParams, getCountries } from "./countries.service";

export async function getCountriesController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const filters: CountriesQueryParams = {
      region:
        typeof req.query.region === "string" ? req.query.region : undefined,

      limit:
        typeof req.query.limit === "string"
          ? Number(req.query.limit)
          : undefined,

      mostPopular: req.query.mostPopular === "true",
    };
    const countries = await getCountries(filters);

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving countries",
    });
  }
}

import pool from "../../config/database";
import { Country } from "./countries.model";

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await pool.query(`SELECT * FROM public.countries`);
    return res.rows;
  } catch (error) {
    console.log("Error consulting Database: ", error);
    throw error;
  }
}

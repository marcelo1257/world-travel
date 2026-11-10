import pool from "../../config/database";

export async function getBackgoundImages(
  filters: CountriesQueryParams = {},
): Promise<Country[]> {
  try {
    let query = "SELECT * FROM countries";
    const conditions: string[] = [];
    const values: (string | number)[] = [];

    if (filters.region) {
      values.push(filters.region);
      conditions.push(`region = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    if (filters.mostPopular === true) {
      query += " ORDER BY likes DESC ";
    }

    if (filters.limit !== undefined) {
      values.push(filters.limit);
      query += ` LIMIT $${values.length}`;
    }

    const result = await pool.query<Country>(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error consulting Database:", error);
    throw error;
  }
}

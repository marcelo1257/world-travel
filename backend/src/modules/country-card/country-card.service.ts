import pool from "../../config/database";

export async function getBackgoundImages() {
  const backgroundList = await pool.query(`
    SELECT DISTINCT ON (country_id)
        country_id,
        image_url
    FROM countries_images
    ORDER BY country_id, RANDOM();
    `);
  return backgroundList;
}

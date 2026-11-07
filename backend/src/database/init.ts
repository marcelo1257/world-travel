import pool from "../config/database";

export async function runDatabase(): Promise<void> {
  await initializeDatabase();

  const findCountries = await needCountriesImport();

  if (findCountries) {
    console.log("Import needed");
    await importCountries();
  } else {
    return console.log("No import needed");
  }
}

async function initializeDatabase(): Promise<void> {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS countries (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            alpha3code CHAR(3) NOT NULL UNIQUE,
            alpha2code TEXT NOT NULL,
            region VARCHAR(50) NOT NULL,
            capital VARCHAR(150)
        );
    `);
  console.log("Database initialized successfully.");
}

async function needCountriesImport(): Promise<boolean> {
  try {
    const result = await pool.query(`
        SELECT EXISTS (
            SELECT 1 FROM countries
        ) AS exists;
    `);
    return !result.rows[0].exists;
  } catch (error) {
    console.log("Connection failed to check countries: ", error);
    throw error;
  }
}

interface CountryAPI {
  name: string;
  alpha3Code: string;
  alpha2Code: string;
  region: string;
  capital: string | null;
}

async function importCountries(): Promise<void> {
  try {
    const countriesURL = process.env.COUNTRIES_API_URL;

    if (!countriesURL) {
      return console.log("No API URL specified to get countries");
    }

    const response = await fetch(countriesURL);

    if (!response.ok) {
      throw new Error(`Countries API error: ${response.status}`);
    }

    const countries: CountryAPI[] = await response.json();

    const values = countries.flatMap((country) => [
      country.name,
      country.alpha3Code,
      country.alpha2Code.toLowerCase(),
      country.region,
      country.capital,
    ]);

    const placeholders = countries
      .map((_, index) => {
        const position = index * 5;

        return `(
      $${position + 1},
      $${position + 2},
      $${position + 3},
      $${position + 4},
      $${position + 5}
    )`;
      })
      .join(",");

    const query = `
      INSERT INTO countries (
      name,
      alpha3code,
      alpha2code,
      region,
      capital
      ) VALUES ${placeholders}
    `;

    await pool.query(query, values);
    console.log("Countries imported with sucess");
    // await pool.query(
    //   `
    //   INSERT INTO countries (
    //   name,
    //   alpha3Code,
    //   flag,
    //   region,
    //   capital
    //   ) VALUES ${placeholders}
    // `,
    //   values,
    // );
  } catch (error) {
    console.log("Failed to get countries: ", error);
    throw error;
  }
}

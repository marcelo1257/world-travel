import pool from "../config/database";
import { CountryAPI, imageDataFromAPI } from "./interfaces";

export async function runDatabase(): Promise<void> {
  await initializeDatabase();

  const needCountries = await needCountriesImport();

  if (needCountries) {
    console.log("Import needed");
    await importCountries();
  } else {
    console.log("No country import needed");
    await needImageBackground();
  }

  console.log("Initialization finish");
}

async function initializeDatabase(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS countries (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        alpha3code CHAR(3) NOT NULL UNIQUE,
        alpha2code TEXT NOT NULL,
        region VARCHAR(50) NOT NULL,
        capital VARCHAR(150),
        likes INTEGER NOT NULL DEFAULT 0
    );
  `);

  await pool.query(`
    ALTER TABLE countries
    ADD COLUMN IF NOT EXISTS likes INTEGER NOT NULL DEFAULT 0;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS countries_images (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      country_id INTEGER NOT NULL,
      image_id INTEGER UNIQUE NOT NULL ,
      image_url TEXT NOT NULL,
      image_description TEXT,
      image_license TEXT,
      image_license_url TEXT,
      image_author TEXT,

        CONSTRAINT fk_country_images_country
          FOREIGN KEY (country_id)
          REFERENCES countries(id)
          ON DELETE CASCADE
      )
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

    await pool.query(`
      UPDATE countries
      SET likes = CASE alpha3Code
        WHEN 'PRT' THEN 950
        WHEN 'ESP' THEN 870
        WHEN 'FRA' THEN 1200
        WHEN 'ITA' THEN 1100
        WHEN 'JPN' THEN 1050
        WHEN 'USA' THEN 980
        ELSE 0
      END;
    `);
    console.log("Manual likes added");
  } catch (error) {
    console.log("Failed to get countries: ", error);
    throw error;
  }
}

async function needImageBackground() {
  const countriesToImportBackground = await pool.query(
    `SELECT
          c.id AS country_id,
          COUNT(ci.id) AS total_images
      FROM countries c
      LEFT JOIN countries_images ci
          ON ci.country_id = c.id
      GROUP BY c.id
      HAVING COUNT(ci.id) < 5`,
  );

  const _countriesToImportBackground = countriesToImportBackground.rows;

  if (countriesToImportBackground.rows.length === 0) {
    return console.log("No background images required");
  } else {
    let _countriesPlaceholders = [];
    console.log(
      "Need countries background images: " +
        countriesToImportBackground.rows.length,
    );

    for (const country of _countriesToImportBackground) {
      _countriesPlaceholders.push(country.country_id);
    }
    await importBackgroundImages(_countriesPlaceholders);
  }
}

async function importBackgroundImages(_countriesPlaceholders: any) {
  try {
    const countriesPlaceholders = _countriesPlaceholders.toString();

    const selectQuery = `SELECT DISTINCT id, name, capital FROM countries WHERE id IN (${countriesPlaceholders})`;

    const countriesList = await pool.query(selectQuery);

    const _countriesList = countriesList.rows;

    for (const country of _countriesList) {
      const countryId = country.id;
      const countryName = country.name ?? "";
      const countryCapital = country.capital ?? "";

      const searchParamCountry = `${countryName} ${countryCapital} landscape`;
      // console.log(searchParamCountry);

      const apiUrl = new URL("https://commons.wikimedia.org/w/api.php");

      apiUrl.searchParams.set("action", "query");
      apiUrl.searchParams.set("generator", "search");
      apiUrl.searchParams.set("gsrsearch", searchParamCountry);
      apiUrl.searchParams.set("gsrnamespace", "6");
      apiUrl.searchParams.set("gsrlimit", "5");
      apiUrl.searchParams.set("prop", "imageinfo");
      apiUrl.searchParams.set("iiprop", "url");
      apiUrl.searchParams.set("iiurlwidth", "1200");
      apiUrl.searchParams.set("format", "json");
      apiUrl.searchParams.set("iiprop", "url|extmetadata");

      const response = await fetch(apiUrl, {
        headers: {
          "User-Agent":
            "WorldTravel/1.0 (https://github.com/marcelo1257/world-travel)",
        },
      });

      if (!response.ok) {
        throw new Error(`Wikimedia API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.query?.pages) {
        // console.log("No images found:", searchParamCountry);
        continue;
      }

      const _data = Object.values(data.query.pages) as imageDataFromAPI[];
      // console.log("TestAPI(): " + JSON.stringify(data, null, 2));

      const _importData = _data.map((image) => {
        const imageinfo = image.imageinfo?.[0];
        if (!imageinfo) {
          return;
        } else {
          const extmetadata = image.imageinfo[0].extmetadata;

          return {
            image_id: Number(image.pageid),
            image_url: imageinfo.url,
            image_description: extmetadata.ImageDescription?.value,
            image_license: extmetadata.LicenseShortName?.value,
            image_license_url: extmetadata.LicenseUrl?.value,
            image_author: extmetadata.Artist?.value,
          };
        }
      });
      // console.log(_importData);

      const values = _importData.flatMap((image) => [
        countryId,
        image!.image_id,
        image!.image_url,
        image?.image_description,
        image?.image_license,
        image?.image_license_url,
        image?.image_author,
      ]);
      // console.log("Values: " + values);

      const placeholders = _importData
        .map((_, index) => {
          const position = index * 7;

          return `(
            $${position + 1},
            $${position + 2},
            $${position + 3},
            $${position + 4},
            $${position + 5},
            $${position + 6},
            $${position + 7}
          )`;
        })
        .join(",");
      // console.log(placeholders);

      const query = `
        INSERT INTO countries_images (
        country_id,
        image_id,
        image_url,
        image_description,
        image_license,
        image_license_url,
        image_author
        ) VALUES ${placeholders}
        ON CONFLICT (image_id) DO NOTHING;
      `;
      await pool.query(query, values);
    }

    const imageFailsCount = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.countries c
      LEFT JOIN public.countries_images ci
          ON ci.country_id = c.id
      WHERE ci.country_id IS NULL
        OR ci.image_url IS NULL;
    `);

    const _imageFailsCount = imageFailsCount.rows[0].count;
    console.log("Countries without images: " + _imageFailsCount);
  } catch (error) {
    console.error("Error testing Wikimedia API:", error);
  }
}

import pool from "../../config/database";
import { UserInfoRegister } from "../../database/interfaces";

export async function registerUser(userInfo: UserInfoRegister) {
  try {
    const query = `
    INSERT INTO users (
    create_at, username, password, email
    ) VALUES ($1, $2, $3, $4)
    `;

    const timestamp = new Date().toISOString();
    const values = [
      timestamp,
      userInfo.username,
      userInfo.password,
      userInfo.email,
    ];

    const result = await pool.query(query, values);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function checkSingleUser(field: string, value: any) {
  try {
    const queryStart = `SELECT EXISTS(
        SELECT 1
        FROM users
        WHERE
        `;
    const queryEnd = `= $1
        ) AS exists`;

    const result = await pool.query(queryStart + " " + field + " " + queryEnd, [
      value,
    ]);
    const exists = result.rows[0].exists;
    return {
      type: field,
      result: exists,
    };
  } catch (error) {
    throw error;
  }
}

import { Request, Response } from "express";
import { checkSingleUser, registerUser } from "./authentication.service";

export async function postRegisterUserController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userInfo = req.body;

    await registerUser(userInfo);

    res.status(201).json({
      code: "USER_REGISTED_SUCCESS",
      message: "User registered",
    });
  } catch (error: any) {
    if (error.code === "23505") {
      if (error.constraint === "users_username_key") {
        res.status(409).json({
          code: "USERNAME_ALREADY_EXISTS",
          message: "Username already exists",
          detail: error.detail,
        });
        return;
      }
      if (error.constraint === "users_email_key") {
        res.status(409).json({
          code: "EMAIL_ALREADY_EXISTS",
          message: "Email already exists",
          detail: error.detail,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      });
    }
  }
}

export async function getCheckUsernameAndEmailController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const field = Object.keys(req.query)[0];
    const value = req.query[field];

    const result = await checkSingleUser(field, value);

    if (result.type === field) {
      if (result.result === true) {
        res.status(409).json({
          code: field?.toString().toUpperCase() + "_ALREADY_EXISTS",
          message: field?.toString().toUpperCase() + " already exists",
        });
      }
      if (result.result === false) {
        res.status(200).json({
          code: field?.toString().toUpperCase() + "_AVAILABLE",
          message: field?.toString().toUpperCase() + " available",
        });
      }
    } else {
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

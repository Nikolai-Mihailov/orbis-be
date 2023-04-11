import { NextFunction, Request, Response, RequestHandler } from "express";

import validate from "../helpers/validation/joi-helper";
import { User } from "../helpers/interfaces/user.interface";
import { createUserValidationSchema, userLoginValidationSchema } from "../helpers/validation/user";
import { createUserService, loginUserService } from "../services/user.service";
import { createAccessToken, createRefreshToken } from "../helpers/auth";

export const CreateUserController: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password }: User = req.body;
  const validateSchema: Error | undefined = await validate(createUserValidationSchema, { name, email, password });

  try {
    if (validateSchema instanceof Error) throw new Error(validateSchema.message);
    //  To add types
    const result = await createUserService({ name, email, password });

    result
      ? res.status(422).json({
          message: "User already exists",
        })
      : res
          .status(200)
          .json({
            message: "User was created successfully",
          })
          .redirect("/");
  } catch (error) {
    next(error);
  }
};

export const LoginController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const validateLoginSchema: Error | undefined = await validate(userLoginValidationSchema, req.body);

  if (validateLoginSchema instanceof Error) {
    res.status(400).json({
      message: validateLoginSchema.message,
    });
  }

  const { name, email, password }: User = req.body;
  const user = (await loginUserService({ name, email, password })) as Promise<User>;

  if (!user) {
    res.status(401).json({
      accessToken: "",
      message: "User exists or wrong password",
    });
  }

  const accessToken = createAccessToken(name, email);
  const refreshToken = createRefreshToken(name, email);

  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });

  res.status(200).json({
    result: true,
    accessToken: accessToken,
  });
};

export const LogOutController: RequestHandler = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { httpOnly: true, secure: true, maxAge: 1 }).redirect("/");
};

// TO DO
export const RefreshTokenController: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "RefreshTokenController",
  });
};
// TO DO
export const CurrentUserController: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "CurrentUserController",
  });
};

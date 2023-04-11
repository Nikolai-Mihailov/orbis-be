import bcrypt from "bcrypt";
import prisma from "../helpers/prisma-clitnt";
import { SALT } from "../config/config";
import { User } from "../helpers/interfaces/user.interface";

export const createUserService = async ({ name, email, password }: User) => {
  try {
    const hashedPassword: string = await bcrypt.hash(password!, +SALT!);
    const userExsists: null | User = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (userExsists) {
      return new Error(`User with email: ${userExsists.email} already exists!`);
    }

    return await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return error;
  }
};

export const loginUserService = async ({ name, email, password }: User) => {
  try {
    let matchingPassword: boolean = false;
    const user: User | null = await prisma.users.findFirst({
      where: {
        name,
        email,
      },
    });

    if (user) {
      matchingPassword = await bcrypt.compare(password, user.password);
    }

    if (!user || !matchingPassword) {
      return false;
    }

    return user;
  } catch (error) {
    return error;
  }
};

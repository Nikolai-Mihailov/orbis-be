import bcrypt from "bcrypt";
import prisma from "../src/helpers/prisma-clitnt";

import { faker } from "@faker-js/faker";
import { createUsersSeeds } from "./users";
import { User } from "../src/helpers/interfaces/user.interface";
import { SALT } from "../src/config/config";

(async () => {
  try {
    console.log("Seeding users");
    const users: User[] = await createUsersSeeds(faker, 10, SALT!, bcrypt);

    const savedUsers = await prisma.users.createMany({
      data: users,
    });

    console.log(`${savedUsers.count} users were created`);

    await prisma.$disconnect();
    process.exit(1);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();

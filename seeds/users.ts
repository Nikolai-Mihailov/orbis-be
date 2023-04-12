import { Faker } from "@faker-js/faker";
import { User } from "../src/helpers/interfaces/user.interface";

export const createUsersSeeds = async (faker: Faker, recordsNumber: number, SALT: string, bcrypt: any): Promise<User[]> => {
  const users: User[] = [];
  const userPassword: string = await bcrypt.hash("1234567890", +SALT!);

  for (let i = 0; i < recordsNumber; i++) {
    users.push({
      name: faker.name.firstName().toString(),
      email: faker.internet.email().toString(),
      password: userPassword,
    });
  }

  return users;
};

import { Faker } from "@faker-js/faker";
import { User } from "../src/helpers/interfaces/user.interface";
import { UsersSeeds } from "seeds";

export const createUsersSeeds = (faker: Faker, records: number): User[] => {
  return [
    {
      id: 2,
      name: "ertet",
      email: "ertretretete@kasmd.bg",
      password: "123234324324",
    },
  ];
};

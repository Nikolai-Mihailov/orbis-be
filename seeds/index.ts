import { Faker, faker } from "@faker-js/faker";
import { createUsersSeeds } from "./users";
import { User } from "../src/helpers/interfaces/user.interface";

export interface UsersSeeds {
  faker: Faker;
  records: number;
}

const users: User[] = createUsersSeeds(faker, 10);

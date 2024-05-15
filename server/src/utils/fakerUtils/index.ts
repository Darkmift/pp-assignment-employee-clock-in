import { IUser } from '@/auth/auth.types';
import { faker } from '@faker-js/faker';
import { hashString } from '../bcrypt';

function makeNumber(min, max) {
  return faker.number.int({ min, max }) as unknown as number;
}

// a function that makes a random IUser
export async function createRandomUser(): Promise<IUser> {
  const password = await hashString(faker.internet.password());
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    natid: makeNumber(100000000, 999999999).toString(),
    password,
  };
}

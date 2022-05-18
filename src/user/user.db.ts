import { Nullable, unawaited, Uuid } from '../types';
import { wait } from '../tools';
import { Logger } from '@nestjs/common';

export interface UserEntity {
  id: Uuid;
  age: number;
  name: string;
  email: Nullable<string>;
}

const userTable: UserEntity[] = [
  {
    id: 'a',
    age: 13,
    name: 'User A',
    email: null,
  },
  {
    id: 'b',
    age: 21,
    name: 'User B',
    email: 'user_b@gmail.com',
  },
  {
    id: 'c',
    age: 54,
    name: 'User C',
    email: null,
  },
];

let requestsCounter = 0;

export async function fetchUserTable() {
  await wait(250);
  Logger.verbose(`[${++requestsCounter}] Request to user table`);
  unawaited(clearCounter());
  return userTable;
}

async function clearCounter() {
  await wait(10 * 1000);
  if (requestsCounter !== 0) {
    requestsCounter = 0;
    Logger.debug('User request counter cleared');
  }
}
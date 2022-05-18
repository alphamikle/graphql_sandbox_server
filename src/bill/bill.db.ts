import { unawaited, Uuid } from '../types';
import { wait } from '../tools';
import { Logger } from '@nestjs/common';

export interface BillEntity {
  id: Uuid;
  amount: number;
  userId: Uuid;
}

export interface FetchBillTableParams {
  withoutTracking: boolean;
}

const billTable: BillEntity[] = [
  {
    id: 'a',
    amount: 250,
    userId: 'a',
  },
  {
    id: 'b',
    amount: 600,
    userId: 'b',
  },
  {
    id: 'c',
    amount: 1000,
    userId: 'c',
  },
  {
    id: 'd',
    amount: 2500,
    userId: 'c',
  },
];

let requestsCounter = 0;

export async function fetchBillTable(params?: FetchBillTableParams) {
  await wait(250);
  if (params?.withoutTracking === true) {
    // DO NOTHING
  } else {
    Logger.verbose(`[${++requestsCounter}] Request to bill table`);
    unawaited(clearCounter());
  }
  return billTable;
}

async function clearCounter() {
  await wait(10 * 1000);
  if (requestsCounter !== 0) {
    requestsCounter = 0;
    Logger.debug('Bill request counter cleared');
  }
}
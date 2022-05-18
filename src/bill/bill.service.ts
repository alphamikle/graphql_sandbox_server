import { Injectable } from '@nestjs/common';
import { Nullable, Uuid } from '../types';
import { BillDto } from './dto/bill.dto';
import { BillEntity, fetchBillTable } from './bill.db';
import { isNotDefined } from '../tools';

@Injectable()
export class BillService {
  async findBillById(billId: Uuid): Promise<BillDto> {
    const billEntity = await this.findBillEntityById(billId);
    if (isNotDefined(billEntity)) {
      throw new Error(`Bill with id "${billId}" not found`);
    }
    return new BillDto({
      id: billEntity.id,
      amount: billEntity.amount,
      user: null,
    });
  }

  async findBills(): Promise<BillDto[]> {
    return (await fetchBillTable()).map(it => new BillDto({
      id: it.id,
      amount: it.amount,
      user: null,
    }));
  }

  async findBillsByUserId(userId: Uuid): Promise<BillDto[]> {
    const bills = (await fetchBillTable()).filter(it => it.userId === userId);
    return bills.map(it => new BillDto({
      id: it.id,
      amount: it.amount,
      user: null,
    }));
  }

  async findBillEntityById(billId: Uuid): Promise<Nullable<BillEntity>> {
    return (await fetchBillTable()).find(it => it.id === billId);
  }
}

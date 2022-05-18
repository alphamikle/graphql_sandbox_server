import { Module } from '@nestjs/common';
import { BillResolver } from './bill.resolver';
import { BillService } from './bill.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [
    BillResolver,
    BillService,
    UserService,
  ],
})
export class BillModule {
}

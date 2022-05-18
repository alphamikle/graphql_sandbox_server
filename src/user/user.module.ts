import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { BillService } from '../bill/bill.service';

@Module({
  providers: [
    UserResolver,
    UserService,
    BillService, // Use this approach instead of forwardRef(() => BillModule)
  ],
})
export class UserModule {
}

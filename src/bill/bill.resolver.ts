import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Nullable, Uuid } from '../types';
import { BillDto } from './dto/bill.dto';
import { BillService } from './bill.service';
import { Bill } from '../graphql';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Resolver('Bill')
export class BillResolver {
  constructor(
    private readonly billService: BillService,
    private readonly userService: UserService,
  ) {
  }

  @Query()
  async bill(@Args('id') billId: Uuid): Promise<BillDto> {
    return this.billService.findBillById(billId);
  }

  @Query()
  async bills(): Promise<BillDto[]> {
    return this.billService.findBills();
  }

  @ResolveField()
  async user(@Parent() bill: Bill): Promise<Nullable<UserDto>> {
    return this.userService.findUserByBillId(bill.id);
  }
}

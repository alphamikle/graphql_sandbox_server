import { Bill } from '../../graphql';
import { UserDto } from '../../user/dto/user.dto';
import { Nullable } from '../../types';

export interface NewBillDto {
  id: string;
  amount: number;
  user: Nullable<UserDto>;
}

export class BillDto implements Bill, NewBillDto {
  id: string;
  amount: number;
  user: Nullable<UserDto>;

  constructor(params: NewBillDto) {
    this.id = params.id;
    this.amount = params.amount;
    this.user = params.user;
  }
}
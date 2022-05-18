import { User } from '../../graphql';
import { Nullable } from '../../types';
import { BillDto } from '../../bill/dto/bill.dto';

export interface NewUserDto {
  id: string;
  name: string;
  age: number;
  email: Nullable<string>;
  bills: Nullable<BillDto[]>;
}

export class UserDto implements User, NewUserDto {
  id: string;
  name: string;
  age: number;
  email: Nullable<string>;
  bills: Nullable<BillDto[]>;

  constructor(params: NewUserDto) {
    this.id = params.id;
    this.name = params.name;
    this.age = params.age;
    this.email = params.email;
    this.bills = params.bills;
  }
}
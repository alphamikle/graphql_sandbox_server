import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { BillService } from '../bill/bill.service';
import { Uuid } from '../types';
import { CUser, User, UUser } from '../graphql';
import { BillDto } from '../bill/dto/bill.dto';
import { IUserResolver } from './user.interface';
import { UserDto } from './dto/user.dto';

@Resolver('User')
export class UserResolver implements IUserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly billService: BillService,
  ) {
  }

  @Query()
  async user(@Args('id') request: Uuid): Promise<UserDto> {
    return this.userService.findUserById(request);
  }

  @Query()
  async users(): Promise<UserDto[]> {
    return this.userService.findUsers();
  }

  @Mutation()
  createUser(@Args('cUser') request: CUser): Promise<UserDto> {
    return this.userService.createUser(request);
  }

  @Mutation()
  updateUser(@Args('uUser') request: UUser): Promise<UserDto> {
    return this.userService.updateUser(request);
  }

  @ResolveField()
  async bills(@Parent() request: User): Promise<BillDto[]> {
    return this.billService.findBillsByUserId(request.id);
  }
}

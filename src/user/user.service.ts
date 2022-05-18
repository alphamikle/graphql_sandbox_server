import { Injectable } from '@nestjs/common';
import { Uuid } from '../types';
import { UserDto } from './dto/user.dto';
import { fetchUserTable } from './user.db';
import { isNotDefined, updateField } from '../tools';
import { fetchBillTable } from '../bill/bill.db';
import { CUser, UUser } from '../graphql';

@Injectable()
export class UserService {
  async findUsers(): Promise<UserDto[]> {
    return (await fetchUserTable()).map(it => new UserDto({
      id: it.id,
      name: it.name,
      age: it.age,
      email: it.email,
      bills: null,
    }));
  }

  async findUserById(userId: Uuid): Promise<UserDto> {
    const userEntity = (await fetchUserTable()).find(it => it.id === userId);
    if (isNotDefined(userEntity)) {
      throw new Error(`User with id "${userId}" not found`);
    }
    return new UserDto({
      id: userEntity.id,
      name: userEntity.name,
      age: userEntity.age,
      email: userEntity.email,
      bills: null,
    });
  }

  async findUserByBillId(billId: Uuid): Promise<UserDto> {
    const billEntity = (await fetchBillTable({ withoutTracking: true })).find(it => it.id === billId);
    if (isNotDefined(billEntity)) {
      throw new Error(`Bill with id "${billId}" not found`);
    }
    return this.findUserById(billEntity.userId);
  }

  async createUser(cUser: CUser): Promise<UserDto> {
    const users = await fetchUserTable();
    if (users.some(it => it.id === cUser.id)) {
      throw new Error(`User with id "${cUser.id}" already exist`);
    }
    users.push({
      id: cUser.id,
      name: cUser.name,
      age: cUser.age,
      email: cUser.email ?? null,
    });
    return this.findUserById(cUser.id);
  }

  async updateUser(uUser: UUser): Promise<UserDto> {
    let userEntity = await this.findUserById(uUser.id);
    userEntity = updateField(userEntity, 'name', uUser.name);
    userEntity = updateField(userEntity, 'age', uUser.age);
    userEntity = updateField(userEntity, 'email', uUser.email);
    const userEntities = await fetchUserTable();
    userEntities[userEntities.findIndex(it => it.id === uUser.id)] = userEntity;
    return new UserDto({
      id: userEntity.id,
      name: userEntity.name,
      age: userEntity.age,
      email: userEntity.email,
      bills: null,
    });
  }
}


/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CBill {
    id: string;
    amount: number;
}

export interface UBill {
    id: string;
    amount?: Nullable<number>;
}

export interface CUser {
    id: string;
    name: string;
    age: number;
    email?: Nullable<string>;
    bills?: Nullable<CBill[]>;
}

export interface UUser {
    id: string;
    name?: Nullable<string>;
    age?: Nullable<number>;
    email?: Nullable<string>;
}

export interface Bill {
    id: string;
    amount: number;
    user?: Nullable<User>;
}

export interface IQuery {
    bill(id: string): Bill | Promise<Bill>;
    bills(): Bill[] | Promise<Bill[]>;
    user(id: string): User | Promise<User>;
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    createBill(cBill: CBill): Bill | Promise<Bill>;
    updateBill(uBill: UBill): Bill | Promise<Bill>;
    createUser(cUser: CUser): User | Promise<User>;
    updateUser(uUser: UUser): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
    age: number;
    email?: Nullable<string>;
    bills?: Nullable<Bill[]>;
}

type Nullable<T> = T | null;

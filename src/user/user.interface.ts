import { IMutation, IQuery } from '../graphql';

type UserResolver = Pick<IQuery, 'user' | 'users'>;
type UserMutator = Pick<IMutation, 'updateUser' | 'createUser'>;

export type IUserResolver = UserResolver & UserMutator;
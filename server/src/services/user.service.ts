import { getService, juggler } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { UserDataSource } from '../datasources';

export interface UserService {
  login(username: string, password: string): Promise<object>;
  signUp(payload: object): Promise<object>;
  addUser(payload: any): Promise<object>;
  getListUser(): Promise<object>;


}

export class UserServiceProvider implements Provider<UserService> {
  constructor(
    @inject('datasources.user')
    protected dataSource: juggler.DataSource = new UserDataSource(),
  ) {
  }

  value(): Promise<UserService> {
    return getService(this.dataSource);
  }
}

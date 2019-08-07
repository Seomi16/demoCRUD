import { getService, juggler } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { CommonDataSource } from '../datasources';

export interface CommonService {
  countries(): Promise<object>;
}

export class CommonServiceProvider implements Provider<CommonService> {
  constructor(
    @inject('datasources.common')
    protected dataSource: juggler.DataSource = new CommonDataSource(),
  ) {
  }

  value(): Promise<CommonService> {
    return getService(this.dataSource);
  }
}

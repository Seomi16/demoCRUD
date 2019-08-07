import { getService, juggler } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { SalesDataSource } from '../datasources';

export interface SalesService {
  getPinList(auth: string, token: string): Promise<object>;
  getSalesList(auth: string, token: string): Promise<object>;
  getPurchasePinPaymentType(auth: string, token: string): Promise<object>;
  getPurchasePinWalletType(auth: string, token: string): Promise<object>;
  getPurchasePinPaymentSetting(auth: string, token: string): Promise<object>;
  purchasePin(payload: object, auth: string, token: string): Promise<object>;
  validatePinCode(payload: object, auth: string, token: string): Promise<object>;
  topupPin(payload: object, auth: string, token: string): Promise<object>;
  salesViewDetail(payload: object, auth: string, token: string): Promise<object>;
}

export class SalesServiceProvider implements Provider<SalesService> {
  constructor(
    @inject('datasources.sales')
    protected dataSource: juggler.DataSource = new SalesDataSource(),
  ) {
  }

  value(): Promise<SalesService> {
    return getService(this.dataSource);
  }
}

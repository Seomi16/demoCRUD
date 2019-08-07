import { getService, juggler } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { WalletDataSource } from '../datasources';

export interface WalletService {
  getWallets(payload: object, auth: string, token: string): Promise<object>;
  getWalletBalance(payload: object, auth: string, token: string): Promise<object>;
  statementList(payload: object, auth: string, token: string): Promise<object>;
  getTransferWallet(auth: string, token: string): Promise<object>;
  getWithdrawWallet(auth: string, token: string): Promise<object>;
  getStatementWallet(auth: string, token: string): Promise<object>;
  getPaymentType(auth: string, token: string): Promise<object>;
  getWalletType(auth: string, token: string): Promise<object>;
  getPaymentSetting(payload: object,auth: string, token: string): Promise<object>;
  postTopupMW(payload: object, auth: string, token: string): Promise<object>;
  getEWalletBalance(payload: object, auth: string, token: string): Promise<object>;
  postEWalletTransfer(payload: object, auth: string, token: string): Promise<object>;
  getWithdrawWalletType(auth: string, token: string): Promise<object>;
  getEWalletWithdrawBalance(payload: object, auth: string, token: string): Promise<object>;
  postEWalletWithdraw(payload: object, auth: string, token: string): Promise<object>;
  postStatementWallet(payload: object, auth: string, token: string): Promise<object>;
  getWithdrawList(auth: string, token: string): Promise<object>;
  getWithdrawDetail(payload: object, auth: string, token: string): Promise<object>;
  cancelWithdrawRequest(payload: object, auth: string, token: string): Promise<object>;
}

export class WalletServiceProvider implements Provider<WalletService> {
  constructor(
    @inject('datasources.wallet')
    protected dataSource: juggler.DataSource = new WalletDataSource(),
  ) {
  }

  value(): Promise<WalletService> {
    return getService(this.dataSource);
  }
}

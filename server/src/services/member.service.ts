import { getService, juggler } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { MemberDataSource } from '../datasources';

export interface MemberService {
  updatePassword(payload: object, auth: string, token: string): Promise<object>;
  updateSecPassword(payload: object, auth: string, token: string): Promise<object>;
  setSecPassword(payload: object, auth: string, token: string): Promise<object>;
  currentUser(auth: string, token: string): Promise<object>;
  checkSecPassword(auth: string, token: string): Promise<object>;
  checkActivate(auth: string, token: string): Promise<object>;
  getPackageInfo(auth: string, token: string): Promise<object>;
  getActivePaymentType(auth: string, token: string): Promise<object>;
  getActiveWalletType(auth: string, token: string): Promise<object>;
  getActivePaymentSetting(auth: string, token: string): Promise<object>;
  activeMember(payload: object, auth: string, token: string): Promise<object>;
  getRegisterPaymentType(auth: string, token: string): Promise<object>;
  getRegisterWalletType(auth: string, token: string): Promise<object>;
  getRegisterPaymentSetting(auth: string, token: string): Promise<object>;
  downlineRegisterMember(payload: object, auth: string, token: string): Promise<object>;
  getUplineLeg(payload: object, auth: string, token: string): Promise<object>;
  updateUserProfile(payload: object, auth: string, token: string): Promise<object>;
}

export class MemberServiceProvider implements Provider<MemberService> {
  constructor(
    @inject('datasources.member')
    protected dataSource: juggler.DataSource = new MemberDataSource(),
  ) {
  }

  value(): Promise<MemberService> {
    return getService(this.dataSource);
  }
}

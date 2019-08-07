import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { RequestConfig } from './_requestConfig';
import { RequestTempalte } from './_requestTemplate';
import { userApiUrl } from '../config.json';

let resquest = new RequestConfig();
let reqT = new RequestTempalte();

const currentUser = reqT.get(`${userApiUrl}/api/user/current`,
  '{payload}',
  {
    currentUser: ['auth', 'token']
  }
);
const updatePassword = reqT.post(`${userApiUrl}/api/member/profile/update/password`,
  '{payload}',
  {
    updatePassword: ['payload', 'auth', 'token']
  }
);
const updateSecPassword = reqT.post(`${userApiUrl}/api/member/profile/update/sec-password`,
  '{payload}',
  {
    updateSecPassword: ['payload', 'auth', 'token']
  }
);
const setSecPassword = reqT.post(`${userApiUrl}/api/member/profile/set/sec-password`,
  '{payload}',
  {
    setSecPassword: ['payload', 'auth', 'token']
  }
);

const checkSecPassword = reqT.get(`${userApiUrl}/api/member/profile/check/sec-password`,
  '{payload}',
  {
    checkSecPassword: ['auth', 'token']
  }
);

const checkActivate = reqT.get(`${userApiUrl}/api/member/profile/check/activate`,
  '{payload}',
  {
    checkActivate: ['auth', 'token']
  }
);

const getPackageInfo = reqT.get(`${userApiUrl}/api/common/get/reg-package`,
  '{payload}',
  {
    getPackageInfo: ['auth', 'token']
  }
);

const getActivePaymentType = reqT.get(`${userApiUrl}/api/activate/get/payment-type`,
  '{payload}',
  {
    getActivePaymentType: ['auth', 'token']
  }
);

const getActiveWalletType = reqT.get(`${userApiUrl}/api/activate/get/wallet-type`,
  '{payload}',
  {
    getActiveWalletType: ['auth', 'token']
  }
);

const getActivePaymentSetting = reqT.post(`${userApiUrl}/api/activate/get/payment-setting`,
  '{payload}',
  {
    getActivePaymentSetting: ['auth', 'token']
  }
);

const activeMember = reqT.post(`${userApiUrl}/api/member/activate`,
  '{payload}',
  {
    activeMember: ['payload', 'auth', 'token']
  }
);

const getRegisterPaymentType = reqT.get(`${userApiUrl}/api/member/register/get/payment-type`,
  '{payload}',
  {
    getRegisterPaymentType: ['auth', 'token']
  }
);

const getRegisterWalletType = reqT.get(`${userApiUrl}/api/member/register/get/wallet-type`,
  '{payload}',
  {
    getRegisterWalletType: ['auth', 'token']
  }
);

const getRegisterPaymentSetting = reqT.post(`${userApiUrl}/api/member/register/get/payment-setting`,
  '{payload}',
  {
    getRegisterPaymentSetting: ['auth', 'token']
  }
);

const downlineRegisterMember = reqT.post(`${userApiUrl}/api/member/downline-sign-up`,
  '{payload}',
  {
    downlineRegisterMember: ['payload', 'auth', 'token']
  }
);

const getUplineLeg = reqT.post(`${userApiUrl}/api/member/register/get/up-line-leg`,
  '{payload}',
  {
    getUplineLeg: ['payload', 'auth', 'token']
  }
);

const updateUserProfile = reqT.post(
  `${userApiUrl}/api/member/update-profile`,
  '{payload}',
  {
    updateUserProfile: ['payload', 'auth', 'token'],
  },
);


const config = resquest.secretRequest([updateUserProfile, getUplineLeg, downlineRegisterMember, getRegisterPaymentType, getRegisterPaymentSetting, getRegisterWalletType, activeMember, getActivePaymentType, getActivePaymentSetting, getActiveWalletType, currentUser, updatePassword, updateSecPassword, setSecPassword, checkSecPassword, checkActivate, getPackageInfo]);

export class MemberDataSource extends juggler.DataSource {
  static dataSourceName = 'member';

  constructor(
    @inject('datasources.config.member', {optional: true})
      dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

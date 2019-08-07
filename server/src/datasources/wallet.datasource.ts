import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { RequestConfig } from './_requestConfig';
import { RequestTempalte } from './_requestTemplate';

const walletApiUrl = 'http://172.104.54.206/walletapiv3/public';
import { userApiUrl } from '../config.json';

let resquest = new RequestConfig();

let reqT = new RequestTempalte();

const wallets = reqT.get(
  `${walletApiUrl}/api/wallets`,
  '{payload}',
  {
    getWallets: ['payload', 'auth', 'token'],
  },
);
wallets.showAuth = true;
wallets.showToken = true;

const walletBalance = reqT.get(
  `${walletApiUrl}/api/wallet/balance`,
  '{payload}',
  {
    getWalletBalance: ['payload', 'auth', 'token'],
  },
);
walletBalance.showAuth = true;
walletBalance.showToken = true;

const statementList = reqT.get(
  `${walletApiUrl}/api/statement/list`,
  '{payload}',
  {
    statementList: ['payload', 'auth', 'token'],
  },
);
statementList.showAuth = true;
statementList.showToken = true;

const getTransferWallet = reqT.get(
  `${userApiUrl}/api/member/ewallet/get/transfer-wallet`,
  '{payload}',
  {
    getTransferWallet: ['auth', 'token'],
  },
);
getTransferWallet.showAuth = true;
getTransferWallet.showToken = true;

const getWithdrawWallet = reqT.get(
  `${userApiUrl}/api/member/ewallet/get/withdraw-wallet`,
  '{payload}',
  {
    getWithdrawWallet: ['auth', 'token'],
  },
);
getWithdrawWallet.showAuth = true;
getWithdrawWallet.showToken = true;

const getStatementWallet = reqT.get(
  `${userApiUrl}/api/member/ewallet/get/statement-wallet`,
  '{payload}',
  {
    getStatementWallet: ['auth', 'token'],
  },
);
getStatementWallet.showAuth = true;
getStatementWallet.showToken = true;

const getPaymentType = reqT.get(
  `${userApiUrl}/api/member/ewallet/get/payment-type`,
  '{payload}',
  {
    getPaymentType: ['auth', 'token'],
  },
);
getPaymentType.showAuth = true;
getPaymentType.showToken = true;

const getWalletType = reqT.get(
  `${userApiUrl}/api/member/ewallet/get/wallet-type`,
  '{payload}',
  {
    getWalletType: ['auth', 'token'],
  },
);
getWalletType.showAuth = true;
getWalletType.showToken = true;

const getPaymentSetting = reqT.post(
  `${userApiUrl}/api/member/ewallet/get/payment-setting`,
  '{payload}',
  {
    getPaymentSetting: ['payload','auth', 'token'],
  },
);
getPaymentSetting.showAuth = true;
getPaymentSetting.showToken = true;

const postTopupMW = reqT.post(
  `${userApiUrl}/api/member/ewallet/topup-mw`,
  '{payload}',
  {
    postTopupMW: ['payload', 'auth', 'token'],
  },
);
postTopupMW.showAuth = true;
postTopupMW.showToken = true;

const getEWalletBalance = reqT.post(
  `${userApiUrl}/api/member/ewallet/get/balance`,
  '{payload}',
  {
    getEWalletBalance: ['payload', 'auth', 'token'],
  },
);
getEWalletBalance.showAuth = true;
getEWalletBalance.showToken = true;

const postEWalletTransfer = reqT.post(
  `${userApiUrl}/api/member/ewallet/transfer`,
  '{payload}',
  {
    postEWalletTransfer: ['payload', 'auth', 'token'],
  },
);
postEWalletTransfer.showAuth = true;
postEWalletTransfer.showToken = true;

const getWithdrawWalletType = reqT.get(
  `${userApiUrl}/api/member/ewallet/get/withdraw-wallet-type`,
  '{payload}',
  {
    getWithdrawWalletType: ['auth', 'token'],
  },
);
getWithdrawWalletType.showAuth = true;
getWithdrawWalletType.showToken = true;

const getEWalletWithdrawBalance = reqT.post(
  `${userApiUrl}/api/member/ewallet/get/withdraw-wallet-balance`,
  '{payload}',
  {
    getEWalletWithdrawBalance: ['payload', 'auth', 'token'],
  },
);
getEWalletWithdrawBalance.showAuth = true;
getEWalletWithdrawBalance.showToken = true;

const postEWalletWithdraw = reqT.post(
  `${userApiUrl}/api/member/ewallet/withdraw`,
  '{payload}',
  {
    postEWalletWithdraw: ['payload', 'auth', 'token'],
  },
);
postEWalletWithdraw.showAuth = true;
postEWalletWithdraw.showToken = true;

const postStatementWallet = reqT.post(
  `${userApiUrl}/api/member/ewallet/statement-wallet`,
  '{payload}',
  {
    postStatementWallet: ['payload', 'auth', 'token'],
  },
);
postStatementWallet.showAuth = true;
postStatementWallet.showToken = true;

const getWithdrawList = reqT.get(
  `${userApiUrl}/api/member/ewallet/get/withdraw-list`,
  '{payload}',
  {
    getWithdrawList: ['auth', 'token'],
  },
);
getWithdrawList.showAuth = true;
getWithdrawList.showToken = true;

const getWithdrawDetail = reqT.post(
  `${userApiUrl}/api/member/ewallet/get/withdraw-detail`,
  '{payload}',
  {
    getWithdrawDetail: ['payload', 'auth', 'token'],
  },
);
getWithdrawDetail.showAuth = true;
getWithdrawDetail.showToken = true;


const cancelWithdrawRequest = reqT.post(
  `${userApiUrl}/api/member/ewallet/cancel/withdraw-request`,
  '{payload}',
  {
    cancelWithdrawRequest: ['payload', 'auth', 'token'],
  },
);
cancelWithdrawRequest.showAuth = true;
cancelWithdrawRequest.showToken = true;

const config = resquest.secretRequest([wallets, walletBalance, statementList, getTransferWallet,
  getWithdrawWallet, getStatementWallet, getEWalletBalance, postEWalletTransfer,
  getPaymentType, getWalletType, getPaymentSetting, postTopupMW, getWithdrawWalletType, getEWalletWithdrawBalance, 
  postEWalletWithdraw, postStatementWallet, getWithdrawList, getWithdrawDetail, cancelWithdrawRequest
]);

export class WalletDataSource extends juggler.DataSource {
  static dataSourceName = 'wallet';

  constructor(
    @inject('datasources.config.wallet', {optional: true})
      dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

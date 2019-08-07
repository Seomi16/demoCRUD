import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { RequestConfig } from './_requestConfig';
import { RequestTempalte } from './_requestTemplate';
import { userApiUrl } from '../config.json';

let resquest = new RequestConfig();
let reqT = new RequestTempalte();

const getPinList = reqT.get(`${userApiUrl}/api/sales/pin-list`,
  '{payload}',
  {
    getPinList: ['auth', 'token']
  }
);

const getSalesList = reqT.get(`${userApiUrl}/api/sales/sales-list`,
  '{payload}',
  {
    getSalesList: ['auth', 'token']
  }
);

const getPurchasePinPaymentType = reqT.get(`${userApiUrl}/api/sales/purchase-pin/get/payment-type`,
  '{payload}',
  {
    getPurchasePinPaymentType: ['auth', 'token']
  }
);

const getPurchasePinWalletType = reqT.get(`${userApiUrl}/api/sales/purchase-pin/get/wallet-type`,
  '{payload}',
  {
    getPurchasePinWalletType: ['auth', 'token']
  }
);

const getPurchasePinPaymentSetting = reqT.post(`${userApiUrl}/api/sales/purchase-pin/get/payment-setting`,
  '{payload}',
  {
    getPurchasePinPaymentSetting: ['auth', 'token']
  }
);

const purchasePin = reqT.post(`${userApiUrl}/api/sales/purchase-pin`,
  '{payload}',
  {
    purchasePin: ['payload', 'auth', 'token']
  }
);

const validatePinCode = reqT.post(`${userApiUrl}/api/sales/pin-re-subscription/validate-pin-code`,
  '{payload}',
  {
    validatePinCode: ['payload', 'auth', 'token']
  }
);

const topupPin = reqT.post(`${userApiUrl}/api/sales/pin-re-subscription`,
  '{payload}',
  {
    topupPin: ['payload', 'auth', 'token']
  }
);

const getUplineLeg = reqT.post(`${userApiUrl}/api/member/register/get/up-line-leg`,
  '{payload}',
  {
    getUplineLeg: ['payload', 'auth', 'token']
  }
);

const salesViewDetail = reqT.post(`${userApiUrl}/api/sales/sales-view`,
  '{payload}',
  {
    salesViewDetail: ['payload', 'auth', 'token']
  }
);


const config = resquest.secretRequest([salesViewDetail, topupPin, validatePinCode, getSalesList, getPinList, getUplineLeg, purchasePin, getPurchasePinPaymentType, getPurchasePinPaymentSetting, getPurchasePinWalletType]);

export class SalesDataSource extends juggler.DataSource {
  static dataSourceName = 'sales';

  constructor(
    @inject('datasources.config.sales', {optional: true})
      dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

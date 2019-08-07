import {inject} from '@loopback/core';
import {
  RestBindings,
  ResponseObject,
  get,
  post,
  requestBody
} from '@loopback/rest';
import {SalesService} from '../services';

//import {clientId, secret} from '../config.json';
import {Request} from 'express';
import {authCode} from '../config.json';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export class SalesController {
  constructor(
    @inject('services.SalesService') protected salesService: SalesService,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get('api/sales/pin-list', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetPinList() {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.getPinList(authCode, token);
    return res;
  }

  @get('api/sales/sales-list', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetSalesList() {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.getSalesList(authCode, token);
    return res;
  }
 
  @get('api/sales/purchase-pin/get/payment-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetPurchasePinPaymentType() {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.getPurchasePinPaymentType(authCode, token);
    return res;
  }

  @get('api/sales/purchase-pin/get/wallet-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetPurchasePinWalletType() {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.getPurchasePinWalletType(authCode, token);
    return res;
  }

  @post('api/sales/purchase-pin/get/payment-setting', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetPurchasePinPaymentSetting() {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.getPurchasePinPaymentSetting(authCode, token);
    return res;
  }

  @post('api/sales/purchase-pin', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async PurchasePin(@requestBody() data: any) {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.purchasePin(
      data,
      authCode,
      token,
    );
    return res;
  }

  @post('api/sales/pin-re-subscription/validate-pin-code', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async ValidatePinCode(@requestBody() data: any) {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.validatePinCode(
      data,
      authCode,
      token,
    );
    return res;
  }

  @post('api/sales/pin-re-subscription', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async TopupPin(@requestBody() data: any) {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.topupPin(
      data,
      authCode,
      token,
    );
    return res;
  }

  @post('api/sales/sales-view', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async SalesViewDetail(@requestBody() data: any) {
    const token = this.request.headers['token'] as string;
    const res = await this.salesService.salesViewDetail(
      data,
      authCode,
      token,
    );
    return res;
  }
}

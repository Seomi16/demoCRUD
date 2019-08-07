import {inject} from '@loopback/core';
import {
  RestBindings,
  get,
  post,
  requestBody,
  Request,
  param,
  ResponseObject,
} from '@loopback/rest';
import {WalletService} from '../services';
import {Wallet, EWallet} from '../models';
import {authCode} from '../config.json';
import {Transfer} from '../models/transfer.model';
import {TopupMw} from '../models/topup-mw.model';
import {Withdraw} from '../models/withdraw.model';

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

export class WalletController {
  constructor(
    @inject('services.WalletService')
    protected walletService: WalletService,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get('api/wallets')
  async wallets(
    @param.query.string('page') page: number,
    @param.query.string('limit') limit: number,
    @param.query.string('transaction_date') transaction_date: string,
    @param.query.string('search') search: string,
    @param.query.string('order') order: string,
    @param.query.string('wallet_type') wallet_type: string,
    @param.query.string('effective_date') effective_date: string,
    @requestBody() body: Wallet,
  ) {
    const payload = {
      page: page,
      limit: limit,
    };

    if (transaction_date) {
      Object.assign(payload, {transaction_date: transaction_date});
    }
    if (search) {
      Object.assign(payload, {search: search});
    }
    if (order) {
      Object.assign(payload, {order: order});
    }
    if (wallet_type) {
      Object.assign(payload, {wallet_type: wallet_type});
    }
    if (effective_date) {
      Object.assign(payload, {effective_date: effective_date});
    }

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWallets(payload, authCode, token);
    return res;
  }

  @get('api/wallet/balance')
  async walletBalance(
    @param.query.string('wallet_type') wallet_type: string,
    @param.query.string('effective_date') effective_date: string,
    @param.query.string('transaction_date') transaction_date: string,
    @requestBody() body: Wallet,
  ) {
    const payload = {
      wallet_type: wallet_type,
      transaction_date: transaction_date,
    };

    if (effective_date) {
      Object.assign(payload, {effective_date: effective_date});
    }

    console.log(payload);

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWalletBalance(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @get('api/statement/list')
  async statementList(
    @param.query.string('page') page: number,
    @param.query.string('limit') limit: number,
    @param.query.string('transaction_type') transaction_type: string,
    @param.query.string('search') search: string,
    @param.query.string('order') order: string,
    @param.query.string('wallet_id') wallet_id: string,
    @param.query.string('wallet_type') wallet_type: string,
    @param.query.string('date_from') date_from: string,
    @param.query.string('date_to') date_to: string,
    @requestBody() body: Wallet,
  ) {
    const payload = {
      page: page,
      limit: limit,
    };

    if (transaction_type) {
      Object.assign(payload, {transaction_type: transaction_type});
    }
    if (search) {
      Object.assign(payload, {search: search});
    }
    if (order) {
      Object.assign(payload, {order: order});
    }
    if (wallet_type) {
      Object.assign(payload, {wallet_type: wallet_type});
    }
    if (wallet_id) {
      Object.assign(payload, {wallet_id: wallet_id});
    }

    if (date_from) {
      Object.assign(payload, {date_from: date_from});
    }

    if (date_to) {
      Object.assign(payload, {date_to: date_to});
    }

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.statementList(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @get('api/member/ewallet/get/transfer-wallet', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetTransferWallet() {
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getTransferWallet(authCode, token);
    return res;
  }

  @get('api/member/ewallet/get/withdraw-wallet', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetWithdrawWallet() {
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWithdrawWallet(authCode, token);
    return res;
  }

  @get('api/member/ewallet/get/statement-wallet', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetStatementWallet() {
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getStatementWallet(authCode, token);
    return res;
  }

  @get('api/member/ewallet/get/payment-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetPaymentType() {
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getPaymentType(authCode, token);
    return res;
  }

  @get('api/member/ewallet/get/wallet-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetWalletType() {
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWalletType(authCode, token);
    return res;
  }

  @post('api/member/ewallet/get/payment-setting', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetPaymentSetting(@requestBody() eWallet: EWallet) {
    const payload = {
      wallet: eWallet.ewallet_type_id,
    };

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getPaymentSetting(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @post('api/member/ewallet/topup-mw', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async PostTopupMW(@requestBody() topupMw: TopupMw) {
    console.log(topupMw);
    const payload = {
      topup_amount: topupMw.topup_amount,
      payment_type: topupMw.payment_type,
      wallet_type: topupMw.wallet_type,
      password: topupMw.password,
      payment_detail: topupMw.payment_detail,
    };

    console.log(payload);

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.postTopupMW(payload, authCode, token);
    return res;
  }

  @post('api/member/ewallet/get/balance', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetEWalletBalance(@requestBody() eWallet: EWallet) {
    const payload = {
      wallet: eWallet.ewallet_type_id,
    };
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getEWalletBalance(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @post('api/member/ewallet/transfer', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async PostEWalletTransfer(@requestBody() transfer: Transfer) {
    console.log(transfer);
    const payload = {
      transfer_to: transfer.transfer_to,
      amount: transfer.amount,
      message: transfer.message,
      password: transfer.password,
      wallet_type_from: transfer.wallet_type_from,
      wallet_type_to: transfer.wallet_type_to,
    };

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.postEWalletTransfer(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @get('api/member/ewallet/get/withdraw-wallet-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetWithdrawWalletType() {
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWithdrawWallet(authCode, token);
    return res;
  }

  @post('api/member/ewallet/get/withdraw-wallet-balance', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetEWalletWithdrawBalance(@requestBody() eWallet: EWallet) {
    const payload = {
      wallet: eWallet.ewallet_type_id,
    };
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getEWalletWithdrawBalance(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @post('api/member/ewallet/withdraw', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async PostEWalletWithdraw(@requestBody() withdraw: Withdraw) {
    console.log('withdraw', withdraw);
    const payload = {
      amount: withdraw.amount,
      password: withdraw.password,
      wallet_type: withdraw.wallet_type,
    };

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.postEWalletWithdraw(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @post('api/member/ewallet/statement-wallet', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async PostStatementWallet(@requestBody() formData: any) {
    const payload = {
      wallet: formData.wallet,
      date_from: formData.date_from,
      date_to: formData.date_to,
    };

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.postStatementWallet(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @get('api/member/ewallet/get/withdraw-list', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetWithdrawList() {
    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWithdrawList(authCode, token);
    return res;
  }

  @post('api/member/ewallet/get/withdraw-detail', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async GetWithdrawDetail(@requestBody() formData: any) {
    const payload = {
      id: formData.id,
    };

    console.log(payload);

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWithdrawDetail(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @post('api/member/ewallet/cancel/withdraw-request', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async CancelWithdrawRequest(@requestBody() formData: any) {
    const payload = {
      id: formData.id,
    };

    console.log(payload);

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.cancelWithdrawRequest(
      payload,
      authCode,
      token,
    );
    return res;
  }
}

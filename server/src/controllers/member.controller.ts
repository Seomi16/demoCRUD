import {inject} from '@loopback/core';
import {
  RestBindings,
  ResponseObject,
  get,
  post,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {MemberService} from '../services';
import {UpdatePassword, SecPassword} from '../models';

import {clientId, secret} from '../config.json';
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

export class MemberController {
  constructor(
    @inject('services.MemberService') protected memberService: MemberService, 
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @post('api/member/profile/update/password', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async updatePassword(@requestBody() password: UpdatePassword) {
    if (!password.current) {
      throw new HttpErrors.BadRequest('Current password is required');
    }

    if (!password.password) {
      throw new HttpErrors.BadRequest('New Password is required');
    }

    const payload = {
      current: password.current,
      password: password.password,
      confirm: password.confirm,
    };

    const token = this.request.headers['token'] as string;
    const res = await this.memberService.updatePassword(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @post('api/member/profile/set/sec-password', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async SetSecPassword(@requestBody() password: SecPassword) {
    if (!password.password) {
      throw new HttpErrors.BadRequest('New Second Password is required');
    }
    if (!password.confirm) {
      throw new HttpErrors.BadRequest(
        'Confirm New Second Password is required',
      );
    }

    const payload = {
      password: password.password,
      confirm: password.confirm,
    };

    const token = this.request.headers['token'] as string;
    const res = await this.memberService.setSecPassword(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @post('api/member/profile/update/sec-password', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async UpdateSecPassword(@requestBody() password: UpdatePassword) {
    if (!password.current) {
      throw new HttpErrors.BadRequest('Current password is required');
    }

    if (!password.password) {
      throw new HttpErrors.BadRequest('New Password is required');
    }

    const payload = {
      current: password.current,
      password: password.password,
      confirm: password.confirm,
    };

    const token = this.request.headers['token'] as string;
    const res = await this.memberService.updateSecPassword(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @get('api/member/profile/check/sec-password', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async CheckSecPassword() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.checkSecPassword(authCode, token);
    return res;
  }

  @get('api/member/profile/check/activate', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async CheckActivate() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.checkActivate(authCode, token);
    return res;
  }

  @get('api/common/get/reg-package', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetPackageInfo() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.getPackageInfo(authCode, token);
    return res;
  }

  @get('api/activate/get/payment-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetActivePaymentType() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.getActivePaymentType(authCode, token);
    return res;
  }

  @get('api/activate/get/wallet-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetActiveWalletType() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.getActiveWalletType(authCode, token);
    return res;
  }

  @post('api/member/activate/get/payment-setting', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetActivePaymentSetting() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.getActivePaymentSetting(authCode, token);
    return res;
  }

  @post('api/member/activate', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async ActiveMember(@requestBody() data: any) {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.activeMember(
      data,
      authCode,
      token,
    );
    return res;
  }

  @get('api/member/register/get/payment-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetRegisterPaymentType() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.getRegisterPaymentType(authCode, token);
    return res;
  }

  @get('api/member/register/get/wallet-type', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetRegisterWalletType() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.getRegisterWalletType(authCode, token);
    return res;
  }

  @post('api/member/register/get/payment-setting', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async GetRegisterPaymentSetting() {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.getRegisterPaymentSetting(authCode, token);
    return res;
  }

  @post('api/member/downline-sign-up', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async DownlineRegisterMember(@requestBody() data: any) {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.downlineRegisterMember(
      data,
      authCode,
      token,
    );
    return res;
  }


  @post('api/member/register/get/up-line-leg', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  // tslint:disable-next-line: no-any
  async GetUplineLeg(@requestBody() data: any) {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.getUplineLeg(
      data,
      authCode,
      token,
    );
    return res;
  }

  @post('api/member/update-profile')
  // tslint:disable-next-line: no-any
  async UpdateUserProfile(@requestBody() data: any) {
    const token = this.request.headers['token'] as string;
    const res = await this.memberService.updateUserProfile(
      data,
      authCode,
      token,
    );
    return res;
  }
}

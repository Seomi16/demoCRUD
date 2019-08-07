import { inject } from '@loopback/core';
import { ResponseObject, get } from '@loopback/rest';
import { CommonService } from '../services';

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


export class RegisterController {
  constructor(
    @inject('services.CommonService') protected commonService: CommonService,
  ) {
  }

  @get('api/countries', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async countries() {
    const res = await this.commonService.countries();
    return res;
  }
}

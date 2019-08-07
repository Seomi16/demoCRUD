import {inject} from '@loopback/core';
import {
  RestBindings,
  ResponseObject,
  get,
  post,
  requestBody,
  HttpErrors,
  param,
} from '@loopback/rest';
import {UserService, MemberService} from '../services';
import {LoginUser, User} from '../models';
import {authCode} from '../config.json';
import {Request} from 'express';

import {clientId, secret} from '../config.json';
import {consoleTestResultHandler} from 'tslint/lib/test';

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

const captData = [
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 66,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 29,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 57,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 33,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 25,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 43,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 71,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 31,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 68,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 15,
  },
  {
    feedback: '',
    fullbg: '',
    height: 160,
    id: '',
    link: '',
    xpos: 0,
    ypos: 48,
  },
];

const verfyCaptData = [
  {
    xpos: 117,
  },
  {
    xpos: 138,
  },
  {
    xpos: 72,
  },
  {
    xpos: 198,
  },
  {
    xpos: 140,
  },
  {
    xpos: 98,
  },
  {
    xpos: 139,
  },
  {
    xpos: 126,
  },
  {
    xpos: 180,
  },
  {
    xpos: 179,
  },
  {
    xpos: 173,
  },
];

let getChallenge = async (challenge: number) => {
  return new Promise(function(resolve, reject) {
    let createChallenge = () => {
      const random = Math.floor(Math.random() * Math.floor(10));
      console.log('random === challenge', random === challenge);
      if (random === challenge) {
        createChallenge();
      } else {
        resolve(random);
      }
    };
    createChallenge();
  });
};

export class UserController {
  constructor(
    @inject(RestBindings.Http.REQUEST) public request: Request,
    @inject('services.UserService') protected userService: UserService,
    @inject('services.MemberService') protected memberService: MemberService,
  ) {}

  @post('api/login', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async login(@requestBody() user: LoginUser) {
    if (!user.username) {
      throw new HttpErrors.BadRequest('User name is required');
    }

    if (!user.password) {
      throw new HttpErrors.BadRequest('Password is required');
    }

    const res = await this.userService.login(user.username, user.password);
    return res;
  }


  @post('api/create', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async addUser(@requestBody() user: any) {
    const payload = {
      Username: user.Username,
      Password: user.Password,
      Email: user.Email,
      Birth: user.Birth,
      Sex: user.Sex,  
      Phone: user.Phone,
      NationalID: user.NationalID,
      Height: user.Height

    };
    const res = await this.userService.addUser(payload);
    return res;
  }
  @post('api/update', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async putUser(
    @param.query.number('id') Id : number,
    @requestBody() user: any) {
    const payload = {
      Username: user.Username,
      Password: user.Password,
      Email: user.Email,
      Birth: user.Birth,
      Sex: user.Sex,  
      Phone: user.Phone,
      NationalID: user.NationalID,
      Height: user.Height

    };
    const res = await this.userService.putUser(Id, payload);
    return res;
  }

  @post('api/delete', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async delUser(
    @param.query.number('id') Id : number,
    @requestBody() id: number) {
    const payload = {
     ID: id   
    };
    const res = await this.userService.delUser(Id);
    return res;
  }

  
  @get('api/alluser', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async getListUser() {
    const res = await this.userService.getListUser();
    return res;
  }

  

  // @post('api/sign-up')
  // async signUp(@requestBody() user: User) {
  //   const payload = {
  //     fullname: user.fullname,
  //     username: user.username,
  //     identity: user.identity_no,
  //     country: user.country,
  //     email: user.email,
  //     prefix: user.mobile_prefix,
  //     mobile: user.mobile,
  //     password: user.password,
  //   };
  //   const res = await this.userService.signUp(payload);
  //   return res;
  // }

  

  

  @get('api/get-capt', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async refreshCaptCha(@param.query.string('challenge') challenge: number) {
    const newChallenge = await getChallenge(challenge);

    const res = {
      ...captData[newChallenge as number],
      challenge: newChallenge,
      bg: `/captchas/assets/capts/${newChallenge}/b.png`,
      slice: `captchas/assets/capts/${newChallenge}/p.png`,
    };

    // const res = {
    //   bg: `assets/capts/${newChallenge}/b.png`,
    //   slice: `assets/capts/${newChallenge}/p.png`,
    // };
    return res;
  }

  @get('api/verify-capt', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async veryfyCaptCha(
    @param.query.string('challenge') challenge: number,
    @param.query.string('data') data: number,
  ) {
    let res = {
      success: false,
      validate: '',
    };
    if (
      verfyCaptData[challenge].xpos - 2 <= data &&
      data <= verfyCaptData[challenge].xpos + 2
    ) {
      res = {
        success: true,
        validate: Math.floor(Math.random() * Math.floor(1000000000)).toString(),
      };
    }

    return res;
  }
}

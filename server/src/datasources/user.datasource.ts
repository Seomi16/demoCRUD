import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { RequestConfig } from './_requestConfig';
import { RequestTempalte } from './_requestTemplate';
import { userApiUrl } from '../config.json';

let resquest = new RequestConfig();
let reqT = new RequestTempalte();  

const loginT = reqT.post(`${userApiUrl}/api/signIn`,
  {
    password: '{password}',
    username: '{username}',
  },
  {login: ['username', 'password']}
);
loginT.showAuth = false;
loginT.showToken = false;

const signUpT = reqT.post(`${userApiUrl}/api/signUp`,
  '{payload}',
  {signUp: ['payload']}
);
signUpT.showAuth = false;
signUpT.showToken = false;

const getListUser = reqT.get(`${userApiUrl}/api/alluser`,
  {},
  {getListUser: []}
);
getListUser.showAuth = false;
getListUser.showToken = false;

const addUser = reqT.post(`${userApiUrl}/api/create`,
  '{payload}',
  {addUser: ['payload']}
);
addUser.showAuth = false;
addUser.showToken = false;

const putUser = reqT.post(`${userApiUrl}/api/update/{Id}`,
  '{payload}',
  {putUser: ['Id','payload']}
);
putUser.showAuth = false;
putUser.showToken = false;

const delUser = reqT.post(`${userApiUrl}/api/delete/{Id}`,
  '{payload}',
  {delUser: ['Id']}
);
delUser.showAuth = false;
delUser.showToken = false;


const config = resquest.secretRequest([loginT, signUpT, getListUser, addUser, putUser, delUser]);

export class UserDataSource extends juggler.DataSource {
  static dataSourceName = 'user';

  constructor(
    @inject('datasources.config.user', {optional: true})
      dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

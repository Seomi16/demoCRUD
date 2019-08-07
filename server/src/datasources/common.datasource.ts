import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { RequestConfig } from './_requestConfig';
import { RequestTempalte } from './_requestTemplate';
import { userApiUrl } from '../config.json';

let resquest = new RequestConfig();
let reqT = new RequestTempalte();

const countriesT = reqT.get(
  `${userApiUrl}/api/countries`,
  {

  },
  {countries: []}
);

countriesT.showAuth = false;
countriesT.showToken = false;

const config = resquest.secretRequest([countriesT]);

export class CommonDataSource extends juggler.DataSource {
  static dataSourceName = 'common';

  constructor(
    @inject('datasources.config.common', {optional: true})
      dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

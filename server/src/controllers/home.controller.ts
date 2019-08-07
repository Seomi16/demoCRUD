import {inject} from '@loopback/core';
import {RestBindings, get, Request} from '@loopback/rest';

export class HomeController {

  constructor(
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get('api/earning-summary')
  async earningSummary() {
    const res = {data: {salesTypeData: [
          {
            x: "TODAY EARNING SUMMARY",
            y: 20.00,
          },
          {
            x: "THIS WEEK EARNING SUMMARY",
            y: 280.00,
          }
        ]}};
    return res;
  }

  @get('api/wallet-statistic')
  async walletStatistic() {
    const res = {data: {salesTypeData: [
          {
            "name": "Primary",
            "value": 3594.0000,
            "percent": 80
          },
          {
            "name": "Special",
            "value": 999.0000,
            "percent": 70
          },
          {
            "name": "Asset",
            "value": 64938.0000,
            "percent": 45
          },
          {
            "name": "Bounty",
            "value": 89506.0000,
            "percent": 35
          },
          {
            "name": "Mining",
            "value": 103456.9160,
            "percent": 20
          }
        ]}};
    return res;
  }
}

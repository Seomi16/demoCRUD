import { Injectable } from '@angular/core';

@Injectable()
export class GlobalDataService {
  globalData: object = {};
  constructor() {}
  setGlobalData(key, value) {
    this.globalData[key] = value;
  }

  getGlobalData(key) {
    return this.globalData[key] || null;
  }

  
}

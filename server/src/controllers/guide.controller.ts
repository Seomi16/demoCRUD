import {inject} from '@loopback/core';
import {RestBindings, get, Request} from '@loopback/rest';

export class GuideController {

  constructor(
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get('api/member-guides')
  async memberGuides() {
    let min = 1;
    let max = 30;
    const res = [
      {
        description: "",
        title: "SATOX - New Client Registration via Wallets",
        type: "pdf",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via Wallets",
        type: "video",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN QR",
        type: "pdf",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "video",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "pdf",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "video",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "pdf",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "video",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "photo",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "pdf",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "photo",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
      {
        description: "",
        title: "SATOX - New Client Registration via PIN",
        type: "photo",
        uploadedAt: new Date(`2019-04-${Math.floor(Math.random() * (30 - 1 + 1)) + min}`),
      },
    ];
    return res;
  }
}

import { RssData, getRssData } from './rssdata';

export interface CloudBackend {
  _attributes: {
    domain: string;
    path: string;
    port: string;
    protocol: string;
    registerProcedure: string;
  };
}

export class Cloud {
  domain: string;
  path: string;
  port: number;
  protocol: string;
  registerProcedure: string;

  constructor (json: CloudBackend) {
    this.domain = json._attributes.domain;
    this.path = json._attributes.path;
    this.protocol = json._attributes.protocol;
    this.registerProcedure = json._attributes.registerProcedure;

    if (json._attributes.port) {
      this.port = Number(json._attributes.port);
    } else {
      this.port = null;
    }
  }
}

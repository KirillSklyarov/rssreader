export interface CloudBackend {
  domain: string
  path: string
  port: number
  protocol: string
  registerprocedure: string;
}

export class Cloud {
  domain: string
  path: string
  port: number
  protocol: string
  registerProcedure: string;

  constructor (json: CloudBackend) {
    this.domain = json.domain
    this.path = json.path
    this.port = json.port
    this.protocol = json.protocol
    this.registerProcedure = json.registerprocedure;
  }
}

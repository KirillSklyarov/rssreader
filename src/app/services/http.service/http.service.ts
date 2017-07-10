import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {

  constructor (private http: Http) { }
  getData (query: string) {
    return this.http.get(query);
  }
}

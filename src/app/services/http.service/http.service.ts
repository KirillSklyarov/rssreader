import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable()
export class HttpService {

  constructor (private http: Http) { }
  getData (query: string) {
    console.log(query)
    return this.http.get(query)
  }
}

import { Injectable } from '@angular/core'
// import { HttpService } from './../../services/http.service/http.service'
import { Response, Http } from '@angular/http'

import { Observable, Observer } from 'rxjs'


import { Channel, parseRss } from './../../rss/channel'
import { Item } from './../../rss/item'
import { Image } from './../../rss/image'
import { TextInput } from './../../rss/textinput'
import { BackendChannelInfo } from './../../rss/backendchannelinfo'

import { BreakException } from './../../libs/breakexception'

const FEEDS_DATABASE_LINK = 'assets/data/allchannels.json'

@Injectable()
export class ChannelService {

  private channel: Channel
  private channels: Channel[]
  private channelInfo: BackendChannelInfo
  private channelsInfo: BackendChannelInfo[]

  constructor(private http: Http) { }

  getChannels(): Observable<Channel[]> {

    // public getAccount(): Observable<Account> {
    //   return Observable.create((observer: Observer<Account>) => {
    //     this.auth
    //     .get(ACCOUNT_URL)
    //     .subscribe(
    //     (response: Response) => {
    //       observer.next(new Account(response.json().data));
    //       observer.complete();
    //       },
    //     response => observer.error(response)
    //     );
    //   });
    // }


    // return Observable.create



    // this.http.get(FEEDS_DATABASE_LINK).subscribe((data: Response) => {
    //   console.log('Get data')
    //   this.channelsInfo = data.json()
    //   console.log(this.channelsInfo)

    //   this.channelsInfo.forEach((channelInfo, index) => {
    //     this.http.get(channelInfo.link).subscribe((data: Response) => {
    //       let rawRss = data.text()
    //       let convert = require('xml-js')
    //       let rssJson = JSON.parse(convert.xml2json(rawRss, {compact: true}))
    //       this.channels[index] = new Channel(rssJson, channelInfo)
    //       return this.channels
    //     })
    //   })

    // })


  }
}

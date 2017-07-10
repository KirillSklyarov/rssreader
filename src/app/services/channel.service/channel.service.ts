import { Injectable } from '@angular/core'
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
  private channels: Channel[] = []
  private channelInfo: BackendChannelInfo
  private channelsInfo: BackendChannelInfo[] = []

  constructor(private http: Http) { }

  getData(): Observable<BackendChannelInfo[]> {
    return Observable.create((observer: Observer<BackendChannelInfo[]>) => {
      this.http.get(FEEDS_DATABASE_LINK).subscribe((data: Response) => {
        this.channelsInfo = data.json()
        observer.next(this.channelsInfo)
        observer.complete()
      })
    })
  }

  getChannels(): Observable<Channel[]> {
    return Observable.create((observer: Observer<Channel[]>) => {
      this.getData().subscribe((data: BackendChannelInfo[]) => {
        this.channelsInfo = data
        this.channelsInfo.forEach((channelInfo, index) => {
          this.http.get(channelInfo.link).subscribe((data: Response) => {
            let rawRss = data.text()
            let channel = parseRss(rawRss, this.channelsInfo[index])
            console.log(channel)
            this.channels[index] = channel

            if (index == this.channelsInfo.length - 1) {
              observer.next(this.channels)
              observer.complete()
            }

          })
        })
      })
    })
  }
}

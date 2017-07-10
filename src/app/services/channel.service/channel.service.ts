import { Injectable } from '@angular/core'
import { Response, Http } from '@angular/http'

import { Observable, Observer } from 'rxjs'

import { Channel, parseRss } from './../../rss/channel';
import { Item } from './../../rss/item';
import { Image } from './../../rss/image';
import { TextInput } from './../../rss/textinput';
import { BackendChannelInfo } from './../../rss/backendchannelinfo';

const FEEDS_DATABASE_LINK = 'assets/data/allchannels.json';

@Injectable()
export class ChannelService {

  private channel: Channel
  private allChannels: Channel[] = []

  private channelInfo: BackendChannelInfo
  private allChannelsInfo: BackendChannelInfo[] = []

  constructor(private http: Http) { }

  getAllChannelsInfo(): Observable<BackendChannelInfo[]> {
    return Observable.create((observer: Observer<BackendChannelInfo[]>) => {
      this.http.get(FEEDS_DATABASE_LINK).subscribe((data: Response) => {
        this.allChannelsInfo = data.json()
        observer.next(this.allChannelsInfo)
        observer.complete()
      })
    })
  }

  getSingleChannelInfo(channelName: string): Observable<BackendChannelInfo> {
    return Observable.create((observer: Observer<BackendChannelInfo>) => {
      this.getAllChannelsInfo().subscribe((data: BackendChannelInfo[]) => {
        this.allChannelsInfo = data
        this.allChannelsInfo.forEach((channelInfo, index) => {
          if (channelInfo.name === channelName) {
            observer.next(channelInfo)
            observer.complete()
          }
        })
      })
    })
  }


  getAllChannels(): Observable<Channel[]> {
    return Observable.create((observer: Observer<Channel[]>) => {
      this.getAllChannelsInfo().subscribe((data: BackendChannelInfo[]) => {
        this.allChannelsInfo = data
        this.allChannelsInfo.forEach((channelInfo, index) => {
          this.http.get(channelInfo.link).subscribe((data: Response) => {
            const rawRss = data.text()
            const channel = parseRss(rawRss, this.allChannelsInfo[index])
            this.allChannels[index] = channel

            if (index == this.allChannelsInfo.length - 1) {
              observer.next(this.allChannels)
              observer.complete()
            }

          })
        })
      })
    })
  }

  getSingleChannel(channelName: string): Observable<Channel> {
    return Observable.create((observer: Observer<Channel>) => {
      this.getSingleChannelInfo(channelName).
      subscribe((data: BackendChannelInfo) => {
        this.channelInfo = data
        this.http.get(this.channelInfo.link).subscribe((data: Response) => {
          const rawRss = data.text()
          const channel = parseRss(rawRss, this.channelInfo)
          this.channel = parseRss(rawRss, this.channelInfo)
          observer.next(this.channel)
          observer.complete()
        })
      })
    })
  }

}

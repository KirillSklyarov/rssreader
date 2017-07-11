import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable, Observer } from 'rxjs';

import { Channel, parseRss } from './../../rss/channel';
import { Item } from './../../rss/item';
import { Image } from './../../rss/image';
import { TextInput } from './../../rss/textinput';
import { BackendChannelInfo } from './../../rss/backendchannelinfo';

const FEEDS_DATABASE_LINK = 'assets/data/allchannels.json';

@Injectable()
export class ChannelService {

  private channel: Channel;
  private allChannels: Channel[] = [];

  private channelInfo: BackendChannelInfo;
  private allChannelsInfo: BackendChannelInfo[] = [];

  constructor(private http: Http) { }

  getAllChannelsInfo(): Observable<BackendChannelInfo[]> {
    return Observable.create((observer: Observer<BackendChannelInfo[]>) => {
      this.http.get(FEEDS_DATABASE_LINK).subscribe((channelsData: Response) => {
        this.allChannelsInfo = channelsData.json();
        observer.next(this.allChannelsInfo);
        observer.complete();
      });
    });
  }

  getSingleChannelInfo(channelName: string): Observable<BackendChannelInfo> {
    return Observable.create((observer: Observer<BackendChannelInfo>) => {
      this.getAllChannelsInfo().
      subscribe((channelsInfo: BackendChannelInfo[]) => {
        this.allChannelsInfo = channelsInfo;
        this.allChannelsInfo.forEach((channelInfo, index) => {
          if (channelInfo.name === channelName) {
            observer.next(channelInfo);
            observer.complete();
          }
        });
      });
    });
  }


  getAllChannels(): Observable<Channel[]> {
    return Observable.create((observer: Observer<Channel[]>) => {
      this.getAllChannelsInfo().
      subscribe((channelsInfo: BackendChannelInfo[]) => {
        this.allChannelsInfo = channelsInfo;
        this.allChannelsInfo.forEach((channelInfo, index) => {
          this.http.get(channelInfo.link).subscribe((rss: Response) => {
            const rawRss = rss.text();
            const channel = parseRss(rawRss, this.allChannelsInfo[index]);
            this.allChannels[index] = channel;

            if (index === this.allChannelsInfo.length - 1) {
              observer.next(this.allChannels);
              observer.complete();
            }

          });
        });
      });
    });
  }

  getSingleChannel(channelName: string): Observable<Channel> {
    return Observable.create((observer: Observer<Channel>) => {
      this.getSingleChannelInfo(channelName).
      subscribe((channelInfo: BackendChannelInfo) => {
        this.channelInfo = channelInfo;
        this.http.get(this.channelInfo.link).subscribe((rss: Response) => {
          const rawRss = rss.text();
          const channel = parseRss(rawRss, this.channelInfo);
          this.channel = parseRss(rawRss, this.channelInfo);
          observer.next(this.channel);
          observer.complete();
        });
      });
    });
  }
}

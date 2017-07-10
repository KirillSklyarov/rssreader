import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../../services/http.service/http.service'
import { ChannelService } from
  './../../services/channel.service/channel.service'

import { Channel, parseRss } from './../../rss/channel'
import { Item } from './../../rss/item'
import { Image } from './../../rss/image'
import { TextInput } from './../../rss/textinput'
import { BackendChannelInfo } from './../../rss/backendchannelinfo'

import { FEEDS_DATABASE_LINK } from './../../libs/feedsdatabaselink'

@Component({
  selector: 'home-app',
  templateUrl: './home.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [HttpService, ChannelService]
})
export class HomeComponent implements OnInit {

  channels: Channel[] = []
  channelsInfo: BackendChannelInfo[] = []
  isChannelsLoaded = false

  testChannelsInfo: BackendChannelInfo[] = []

  constructor (private httpService: HttpService,
    private channelService: ChannelService) { }

  ngOnInit () {

    let testChannelsInfo: BackendChannelInfo[]
    this.channelService.getData().subscribe((data) => {
      this.testChannelsInfo = data
      console.log('HomeComponent - testChannelsInfo (inside):', this.testChannelsInfo)
    })
    console.log('HomeComponent - testChannelsInfo (outside):', this.testChannelsInfo)



    // this.channelService.getChannels()

    this.httpService.getData(FEEDS_DATABASE_LINK).
    subscribe((data: Response) => {
      this.channelsInfo = data.json()

      // Add channel objects to channels Array
      this.channelsInfo.forEach((url, index) => {
        this.httpService.getData(this.channelsInfo[index].link).
        subscribe((rssData: Response) => {
          let rssXml = rssData.text()
          let channel = parseRss(rssXml, this.channelsInfo[index])
          this.channels[index] = channel

          if (this.channelsInfo.length == this.channels.length) {
            this.isChannelsLoaded = true
          }
        });
      })
    })
  }

  isListHasElements (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

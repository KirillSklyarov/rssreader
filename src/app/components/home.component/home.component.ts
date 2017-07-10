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

    this.channelService.getAllChannelsInfo().subscribe((data: BackendChannelInfo[]) => {
      this.channelsInfo = data
      console.log('getData in HomeComponent\n', this.channelsInfo)
    })

    this.channelService.getChannels().subscribe((data: Channel[]) => {
      this.channels = data
      console.log('channelService in HomeComponent', this.channels)
      this.isChannelsLoaded = true
    })
  }
}

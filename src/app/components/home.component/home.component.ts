import { Component, OnInit } from '@angular/core'
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
  providers: [ChannelService]
})
export class HomeComponent implements OnInit {

  allChannels: Channel[] = []
  isChannelsLoaded = false

  constructor (private channelService: ChannelService) { }

  ngOnInit () {
    this.channelService.getAllChannels().subscribe((data: Channel[]) => {
      this.allChannels = data
      console.log('channelService in HomeComponent\n', this.allChannels)
      this.isChannelsLoaded = true
    })
  }
}

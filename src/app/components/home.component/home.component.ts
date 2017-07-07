import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../../services/http.service'

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
  providers: [HttpService]
})
export class HomeComponent implements OnInit {

  channels: Channel[] = []
  channelsInfo: BackendChannelInfo[] = []
  isChannelsLoaded = false

  constructor (private httpService: HttpService) { }

  ngOnInit () {

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
          console.log('this.channelsInfo.length:', this.channelsInfo.length,
            '\t', 'this.channels.length', this.channels.length)
          if (this.channelsInfo.length == this.channels.length) {
            this.isChannelsLoaded = true
            console.log(this.isChannelsLoaded)
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

import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../../services/http.service/http.service'

import { Channel, parseRss } from './../../rss/channel'
import { Item } from './../../rss/item'
import { Image } from './../../rss/image'
import { TextInput } from './../../rss/textinput'
import { BackendChannelInfo } from './../../rss/backendchannelinfo'

import { FEEDS_DATABASE_LINK } from './../../libs/feedsdatabaselink'

@Component({
  selector: 'home-app',
  templateUrl: './statistic.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [HttpService]
})
export class StatisticComponent implements OnInit {

  channels: Channel[] = []

  constructor (private httpService: HttpService) { }

  ngOnInit () {

    this.httpService.getData(FEEDS_DATABASE_LINK).
    subscribe((data: Response) => {
      let channelsInfo = data.json()

      // Add channel objects to channels Array
      channelsInfo.forEach((url, index) => {
        this.httpService.getData(channelsInfo[index].link).
        subscribe((rssData: Response) => {
          let rssXml = rssData.text()
          let channel = parseRss(rssXml, channelsInfo[index])
          this.channels[index] = channel
        });
      })
    })
  }
}

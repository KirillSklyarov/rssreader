import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'

import { Channel, parseRss } from './../rss/channel'
import { Item } from './../rss/item'
import { Image } from './../rss/image'
import { TextInput } from './../rss/textinput'
import { BackendChannelInfo } from './../rss/backendchannelinfo'

@Component({
  selector: 'home-app',
  templateUrl: './../pages/home.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class HomeComponent implements OnInit {

  channels: Channel[] = []
  channelsInfo: BackendChannelInfo[] = []

  constructor (private httpService: HttpService) { }

  ngOnInit () {

    let homeComponent = this

    // Request information about channels
    this.httpService.getData('assets/data/rsschannels.json').
    subscribe((data: Response) => {
        homeComponent.channelsInfo = data.json()

        // Add channel objects to channels Array
        homeComponent.channelsInfo.forEach((url, index) => {
          this.httpService.getData(this.channelsInfo[index].link).
          subscribe((rssData: Response) => {
              let rssXml = rssData.text()
              let channel = parseRss(rssXml, homeComponent.channelsInfo[index])
              homeComponent.channels[index] = channel
            });
        })
      })
  }

  isListHasElements (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

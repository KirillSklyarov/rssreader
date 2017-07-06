import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'

import { Channel } from './../rss/channel'
import { Item } from './../rss/item'
import { Image } from './../rss/image'
import { TextInput } from './../rss/textinput'
import { BackendChannelDescription } from './../rss/backendchanneldescription'

@Component({
  selector: 'home-app',
  templateUrl: './../pages/home.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class HomeComponent implements OnInit {

  channels: Channel[] = []
  channelUrls: BackendChannelDescription[] = []

  constructor (private httpService: HttpService) { }

  ngOnInit () {

    let homeComponent = this

    // Request information about channels
    this.httpService.getData('assets/data/rsschannels.json').
      subscribe((data: Response) => {
        homeComponent.channelUrls = data.json()

        // Add channel objects to channels Array
        homeComponent.channelUrls.forEach((url, index) => {
          this.httpService.getData(this.channelUrls[index].link).
            subscribe((data: Response) => {

              // Parse RSS-XML to JSON
              let rssXml = data.text()
              let convert = require('xml-js')
              let rssJson =  JSON.parse(convert.xml2json(rssXml,
                {compact: true}))

              // Deserialization JSON to Cannel object
              let channel: Channel = new Channel(rssJson.rss.channel,
                homeComponent.channelUrls[index])
              console.log(channel)
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

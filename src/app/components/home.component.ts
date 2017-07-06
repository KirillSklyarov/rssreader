import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'

import { Channel } from './../rss/channel'
import { Item } from './../rss/item'
import { Image } from './../rss/image'
import { TextInput } from './../rss/textinput'

@Component({
  selector: 'home-app',
  templateUrl: './../pages/home.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class HomeComponent implements OnInit {

  channels: Channel[] = []
  channelUrls: string[] = ['assets/rbcnews.rss',
    'assets/kommersantnews.xml']

  constructor (private httpService: HttpService) { }

  ngOnInit () {

    let homeComponent = this

    this.channelUrls.forEach((url, index) => {
      this.httpService.getData(this.channelUrls[index]).
        subscribe((data: Response) => {
          let rssXml = data.text()
          let convert = require('xml-js')

          let rssJson =  JSON.parse(convert.xml2json(rssXml,
            {compact: true}))
          let channel: Channel = new Channel(rssJson.rss.channel)
          console.log(channel)

        });
    })
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

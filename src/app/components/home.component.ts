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
  channelsUrl: string[] = ['assets/news.rss']

  constructor (private httpService: HttpService) { }

  ngOnInit () {

    let parser = require('rss-parser');


    parser.parseURL(this.channelsUrl[0], function(err, parsed) {
      console.log(parsed.feed)
      let item = new Item(parsed.feed.entries[0])
      console.log(item)
    })
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

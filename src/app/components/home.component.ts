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
    let channel: Channel
    let item: Item

    // Pasre RSS

    this.channelsUrl.forEach(chanUrl => {

      parser.parseURL(this.channelsUrl[0], function(err, parsed) {
        console.log(parsed.feed)

        channel = new Channel()
        // channel.items = parsed.feed[]
        // for (let keyChannel in parsed.feed) {
        //   if (keyChannel == 'entries') {
            channel.items = []
            parsed.feed['entries'].forEach(entry => {
              item = new Item()
              for (let keyEntry in entry) {
                item[keyEntry] = entry[keyEntry]
              }
              channel.items.push(item)
            })
            // console.log(channel.items)
          // } 
        }
      })

    })
    this.channels.forEach(channel => {
      console.log(channel)
    })
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

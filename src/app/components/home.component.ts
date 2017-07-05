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
    var FeedMe = require('feedme');
    var http = require('http');

    http.get(this.channelsUrl[0], function(res) {
      var parser = new FeedMe(true);
      res.pipe(parser);
      parser.on('end', function() {
        let jsonRss = parser.done()

        console.log(jsonRss)

        this.channels = []

        this.channels[0] = new Channel(jsonRss)
        console.log(this.channels[0])

      });
    });
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

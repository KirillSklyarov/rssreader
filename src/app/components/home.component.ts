import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'
import { Channel } from './../rss/channel'

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
      console.log(parsed.feed);
      parsed.feed.entries.forEach(function(entry) {
        console.log(entry.title + ':' + entry.link);
      })
    })
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

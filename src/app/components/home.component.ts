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
    let FeedMe = require('feedme')
    let http = require('http')
    //let parser = new FeedMe

    for (let i = 0; i < this.channelsUrl.length; i++) {
      http.get(this.channelsUrl[i], function(res) {
        let parser = new FeedMe(true)
        res.pipe(parser)
        parser.on('end', function() {
          console.log(parser.done())
        })
      })
    }
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

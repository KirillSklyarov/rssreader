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
    for (let i = 0; i < this.channelsUrl.length; i++) {
      this.httpService.getData(this.channelsUrl[i]).
      subscribe((data: Response) => {

        // Parse XML to object Channel
        let parseString = require('xml2js').parseString;
        let xml = data['_body']

        parseString(xml, function (err, result) {
          console.log(result.rss.channel[0])
          for (let i = 0; i < result.rss.channel.length; i++){
            let chan = result.rss.channel[i]
            let channel = Channel
            for (let prop in chan) {
              if (prop == 'pubDate' || prop == 'lastBuildDate') {
                channel[prop] = new Date(chan[prop])
              }
            }
          }
        })
      })
    }
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

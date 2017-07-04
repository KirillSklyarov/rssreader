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

  feed = require('rss-to-json')
  channels: Channel[] = []
  channelList: string[] = ['./../public/lentanews.xml',
    './../public/rbcnews.xml']
  channel: string = ''

  constructor (private httpService: HttpService) { }

  ngOnInit () {
    for (let i = 0; i < this.channelList.length; i++) {
      this.httpService.getData(this.channelList[i]).subscribe((data: Response) =>
      {
        this.feed.load(this.channelList[i], function(err, rss) {
            console.log(rss)
        })
      })
    }
  }

  addChannel () {
    this.httpService.getData(this.channel).subscribe((data: Response) => {
      console.log(data.toLocaleString)
    })
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

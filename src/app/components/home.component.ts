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

  //feed = require('rss-to-json')
  channels: Channel[] = []
  channel: string = 'assets/news.rss'

  constructor (private httpService: HttpService) { }

  ngOnInit () {
    this.httpService.getData(this.channel).subscribe((data: Response) => {
      console.log(data)
    })
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

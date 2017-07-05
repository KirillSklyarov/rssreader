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
          let parseString = require('xml2js').parseString;

          parseString(rssXml, function (err, result) {
            console.log(result);
            console.log(homeComponent.channels instanceof Array)
          });

        });
    })
  }

  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

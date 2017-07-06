import { Component, OnInit, Input } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'

import { Channel } from './../rss/channel'
import { Item } from './../rss/item'
import { Image } from './../rss/image'
import { TextInput } from './../rss/textinput'

@Component({
  selector: 'home-app',
  templateUrl: './../pages/channel.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class ChannelComponent implements OnInit {

  channel: Channel
  channelUrl: string

  constructor (private httpService: HttpService) { }

  ngOnInit () {

  }

}

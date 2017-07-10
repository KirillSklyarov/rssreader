import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../../services/http.service/http.service'

import { Channel, parseRss } from './../../rss/channel'
import { Item } from './../../rss/item'
import { Image } from './../../rss/image'
import { TextInput } from './../../rss/textinput'
import { BackendChannelInfo } from './../../rss/backendchannelinfo'

@Component({
  selector: 'home-app',
  templateUrl: './statistic.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [HttpService]
})
export class StatisticComponent implements OnInit {

  channels: Channel[] = []

  constructor (private httpService: HttpService) { }

  ngOnInit () {


  }
}

import { Component, OnInit } from '@angular/core';

import { Channel } from './../../rss/channel';
import { Item } from './../../rss/item';
import { Image } from './../../rss/image';
import { TextInput } from './../../rss/textinput';
import { BackendChannelInfo } from './../../rss/backendchannelinfo';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.html',
  styleUrls: ['./../../styles/style.css'],
  providers: []
})
export class StatisticComponent implements OnInit {

  channels: Channel[] = [];

  constructor () { }

  ngOnInit () {


  }
}

import { Component, Input } from '@angular/core';

import { Channel } from './../../libs/rss/channel';
import { Item } from './../../libs/rss/item';
import { Image } from './../../libs/rss/image';
import { TextInput } from './../../libs/rss/textinput';
import { BackendChannelInfo } from './../../libs/rss/backendchannelinfo';

@Component({
  selector: 'home-statistic',
  templateUrl: './home-statistic.html',
  styleUrls: ['./../../styles/style.css'],
  providers: []
})
export class HomeStatisticComponent {

  @Input() allChannels: Channel[];

  constructor () { }

}

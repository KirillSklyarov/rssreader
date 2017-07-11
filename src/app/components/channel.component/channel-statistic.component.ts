import { Component, OnInit, Input } from '@angular/core';

import { Channel } from './../../libs/rss/channel';
import { Item } from './../../libs/rss/item';
import { Image } from './../../libs/rss/image';
import { TextInput } from './../../libs/rss/textinput';
import { BackendChannelInfo } from './../../libs/rss/backendchannelinfo';

import { QuantityOfChars } from './../../libs/quantity-of-chars';

@Component({
  selector: 'channel-statistic',
  templateUrl: './channel-statistic.html',
  styleUrls: ['./../../styles/style.css'],
  providers: []
})
export class ChannelStatisticComponent implements OnInit {

  @Input() currentChannel: Channel;

  numberOfAuthors = 0;
  authors: string[] = [];

  constructor () { }

  ngOnInit () {
    this.currentChannel.items.forEach(item => {
      if (item.author) { // Check if item.author is exist
        if (this.authors.indexOf(item.author) === -1) {
          this.numberOfAuthors += 1;
        }
      }
    });
  }
}

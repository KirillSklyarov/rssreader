import { Component, OnInit, Input } from '@angular/core';

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

  @Input() currentChannel: Channel;
  @Input() allChannels: Channel[];
  @Input() currentItemDescription: string;

  @Input() selector: string;

  numberOfAuthors = 0
  authors: string[] = []

  constructor () { }

  ngOnInit () {
    console.log('selector:', this.selector)
    if (this.selector === 'ChannelComponent') {
      console.log('selector:', this.selector)
      this.currentChannel.items.forEach(item => {
        if (item.author) { // Check if item.author is exist
          if (this.authors.indexOf(item.author) == -1) {
            this.numberOfAuthors += 1;
          }
        }
      });
    }
  }
}

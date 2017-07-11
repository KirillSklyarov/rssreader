import { Component, OnInit, Input } from '@angular/core';

import { Channel } from './../../libs/rss/channel';
import { Item } from './../../libs/rss/item';
import { Image } from './../../libs/rss/image';
import { TextInput } from './../../libs/rss/textinput';
import { BackendChannelInfo } from './../../libs/rss/backendchannelinfo';

import { QuantityOfChars } from './../../libs/quantity-of-chars';

@Component({
  selector: 'message-statistic',
  templateUrl: './message-statistic.html',
  styleUrls: ['./../../styles/style.css'],
  providers: []
})
export class MessageStatisticComponent implements OnInit {

  @Input() currentChannel: Channel;
  @Input() allChannels: Channel[];
  @Input() itemDescription: string;

  @Input() selector: string;

  numberOfAuthors = 0;
  authors: string[] = [];

  allLatinChars = '';
  quantityOfChars: QuantityOfChars = new QuantityOfChars();

  constructor () { }

  ngOnInit () {

    const regexp = new RegExp(/[^a-z]/gmi);

    this.allLatinChars = this.itemDescription.replace(regexp, '').
    toLowerCase();

    let currentChar: string;
    let currentRegExp: RegExp;
    let currentQuantity: string;
    for (let asciiCharCode = 97; asciiCharCode <= 122; asciiCharCode++) {
      currentChar = String.fromCharCode(asciiCharCode);
      currentRegExp = new RegExp(currentChar, 'g');

      try {
        this.quantityOfChars[currentChar] =
          this.allLatinChars.match(currentRegExp).length;
      } catch (error) {
        if (!(error.name === 'TypeError')) {
          throw error;
        }
      }
    }
  }
}

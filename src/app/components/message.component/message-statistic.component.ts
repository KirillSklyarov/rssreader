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

  @Input() itemDescription: string;
  allLatinChars = '';
  allLatinCharsLength: number;
  quantityOfChars: QuantityOfChars[] = []

  // Test data
  pieChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {'title': 'Tasks'},
  };

  constructor () { }

  ngOnInit () {

    this.allLatinChars = this.itemDescription.replace(/[^a-z]/gmi, '').
    toLowerCase();
    this.allLatinCharsLength = this.allLatinChars.length;

    if (this.allLatinChars) {
      let currentChar: string;
      let currentRegExp: RegExp;
      let currentQuantity: string;
      for (let asciiCharCode = 97; asciiCharCode <= 122; asciiCharCode++) {
        currentChar = String.fromCharCode(asciiCharCode);
        currentRegExp = new RegExp(currentChar, 'g');

        try {
          this.quantityOfChars.push(new QuantityOfChars(currentChar,
            this.allLatinChars.match(currentRegExp).length));
        } catch (error) {
          if (!(error.name === 'TypeError')) {
            throw error;
          }
        }
      }
    }
  }
}

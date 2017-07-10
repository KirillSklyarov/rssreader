import { Component, OnInit } from '@angular/core';
import {ChannelService} from './../../services/channel.service/channel.service';

import { Channel } from './../../rss/channel';
import { Item } from './../../rss/item';
import { Image } from './../../rss/image';
import { TextInput } from './../../rss/textinput';
import { BackendChannelInfo } from './../../rss/backendchannelinfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [ChannelService]
})
export class HomeComponent implements OnInit {

  allChannels: Channel[] = [];
  areChannelsLoaded = false;

  constructor (private channelService: ChannelService) { }

  ngOnInit () {
    this.channelService.getAllChannels().subscribe((data: Channel[]) => {
      this.allChannels = data;
      console.log('channelService in HomeComponent\n', this.allChannels);
      this.areChannelsLoaded = true;
    });
  }
}

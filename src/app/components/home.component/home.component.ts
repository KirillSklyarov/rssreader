import { Component, OnInit } from '@angular/core';
import {ChannelService} from './../../services/channel.service/channel.service';

import { Channel } from './../../libs/rss/channel';
import { Item } from './../../libs/rss/item';
import { Image } from './../../libs/rss/image';
import { TextInput } from './../../libs/rss/textinput';
import { BackendChannelInfo } from './../../libs/rss/backendchannelinfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [ChannelService]
})
export class HomeComponent implements OnInit {

  allChannels: Channel[];
  areChannelsLoaded: boolean;

  constructor (private channelService: ChannelService) { }

  ngOnInit () {
    this.areChannelsLoaded = false;
    this.channelService.getAllChannels().subscribe((data: Channel[]) => {
      this.allChannels = data;
      this.areChannelsLoaded = true;
    });
  }
}

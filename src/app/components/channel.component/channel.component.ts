import { Component, OnInit, OnDestroy } from '@angular/core';
import {ChannelService} from './../../services/channel.service/channel.service';

import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Channel } from './../../libs/rss/channel';
import { Item } from './../../libs/rss/item';
import { Image } from './../../libs/rss/image';
import { TextInput } from './../../libs/rss/textinput';
import { BackendChannelInfo } from './../../libs/rss/backendchannelinfo';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [ChannelService]
})
export class ChannelComponent implements OnInit, OnDestroy {

  channel: Channel;
  isChannelExist = false;
  private channelTitle = '';
  private channelName: string;
  private subscription: Subscription;

  constructor(private channelService: ChannelService,
    private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.channelName = params['channelName'];
      this.channelService.getSingleChannel(this.channelName).
      subscribe((data: Channel) => {
        this.channel = data;
        this.isChannelExist = true;
        if (this.channel.title) {
          this.channelTitle = this.channel.title;
        }
      });
    });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}

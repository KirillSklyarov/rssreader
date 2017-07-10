import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {ChannelService} from './../../services/channel.service/channel.service';

import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Channel, parseRss } from './../../rss/channel';
import { Item } from './../../rss/item';
import { Image } from './../../rss/image';
import { TextInput } from './../../rss/textinput';
import { BackendChannelInfo } from './../../rss/backendchannelinfo';

@Component({
  selector: 'app-message',
  templateUrl: './message.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [ChannelService]
})
export class MessageComponent implements OnInit, OnDestroy {

  private channelName: string;
  private itemId: number;

  private channel: Channel;

  private isChannelExist = false;
  private isItemExist = false;
  private isItemTitleExist = false;
  private isItemDescriptionExist = false;
  private isItemLinkExist = false;

  private subscription: Subscription;

  constructor(private channelService: ChannelService,
    private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.channelName = params['channelName'];
      this.itemId = params['itemId'];
      this.channelService.getSingleChannel(this.channelName).
      subscribe((data: Channel) => {
        this.channel = data;
        this.isChannelExist = true;

        if (this.isChannelExist) {
          if (this.channel.items[this.itemId]) {
            this.isItemExist = true;
          }

          if (this.isItemExist) {
            if (this.channel.items[this.itemId].title) {
              this.isItemTitleExist = true;
            }

            if (this.channel.items[this.itemId].description) {
              this.isItemDescriptionExist = true;
            }

            if (this.channel.items[this.itemId].link) {
              this.isItemLinkExist = true;
            }
          }



        }



      });

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

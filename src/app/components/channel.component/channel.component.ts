import { Component, OnInit, OnDestroy } from '@angular/core'
import { ChannelService } from
  './../../services/channel.service/channel.service'

import { ActivatedRoute} from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { Channel } from './../../rss/channel'
import { Item } from './../../rss/item'
import { Image } from './../../rss/image'
import { TextInput } from './../../rss/textinput'
import { BackendChannelInfo } from './../../rss/backendchannelinfo'

@Component({
  selector: 'channel-app',
  templateUrl: './channel.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [ChannelService]
})
export class ChannelComponent implements OnInit, OnDestroy {

  private channel: Channel
  private isChannelExist = false
  private channelTitle = ""
  private channelName: string
  private subscription: Subscription;

  constructor(private channelService: ChannelService,
    private activateRoute: ActivatedRoute){
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.channelName = params['channel']
      this.channelService.getSingleChannel(this.channelName).
      subscribe((data: Channel) => {
        this.channel = data
        this.isChannelExist = true
        if (this.channel.title) {
          this.channelTitle = this.channel.title
        }
      })
    })
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }
}

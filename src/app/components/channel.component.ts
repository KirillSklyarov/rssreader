import { Component, OnInit, OnDestroy } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'

import { ActivatedRoute} from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { Channel } from './../rss/channel'
import { Item } from './../rss/item'
import { Image } from './../rss/image'
import { TextInput } from './../rss/textinput'

@Component({
  selector: 'channel-app',
  templateUrl: './../pages/channel.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class ChannelComponent implements OnInit, OnDestroy {

  channelUrl: string
  channel: Channel
  channelNotFound = true

  private channelName: string
  private subscription: Subscription;


  constructor(private httpService: HttpService,
    private activateRoute: ActivatedRoute){
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.channelName = params['channel']
      this.httpService.getData('assets/data/rsschannels.json').
        subscribe((data: Response) => {
          let channelList = data.json()

          // Find current channel
          channelList.forEach((channel, index) => {
            if (this.channelName == channel.name) {
              this.channelNotFound = false
              
            }
          })
        })
    })
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }


  // ngOnInit () {
  //
  // }


}

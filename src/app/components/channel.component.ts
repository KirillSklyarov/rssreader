import { Component, OnInit, OnDestroy } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'

import { ActivatedRoute} from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { Channel } from './../rss/channel'
import { Item } from './../rss/item'
import { Image } from './../rss/image'
import { TextInput } from './../rss/textinput'
import { BackendChannelDescription } from './../rss/backendchanneldescription'

@Component({
  selector: 'channel-app',
  templateUrl: './../pages/channel.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class ChannelComponent implements OnInit, OnDestroy {

  channelUrl: string

  channelInfo: BackendChannelDescription
  channel: Channel
  channelIsExist = false

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
          console.log(channelList)

          // Find current channel
          channelList.forEach(channel => {
            console.log(channel)
            console.log(this.channelIsExist)

            if (!this.channelIsExist) {
              if (this.channelName === channel.name) {
                console.log('Channel is found')
                this.channelIsExist = true
                this.channelInfo = channel
              }
            }
          })

          // Get channel
          if (this.channelIsExist) {
            this.httpService.getData(this.channelInfo.link).
              subscribe((rssData: Response) => {

            })
          } else {
            console.error('Channel not found')
          }
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

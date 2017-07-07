import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'

import { ActivatedRoute} from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { Channel, parseRss } from './../rss/channel'
import { Item } from './../rss/item'
import { Image } from './../rss/image'
import { TextInput } from './../rss/textinput'
import { BackendChannelInfo } from './../rss/backendchannelinfo'

import { BreakException } from './../libs/breakexception'
import { FEEDS_DATABASE_LINK } from './../libs/feedsdatabaselink'

@Component({
  selector: 'channel-app',
  templateUrl: './../pages/channel.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class ChannelComponent implements OnInit, OnDestroy {

  channelUrl: string

  channelInfo: BackendChannelInfo
  channel: Channel
  isChannelExist = false
  channelTitle = ""

  private channelName: string
  private subscription: Subscription;

  constructor(private httpService: HttpService,
    private activateRoute: ActivatedRoute){
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.channelName = params['channel']
      this.httpService.getData(FEEDS_DATABASE_LINK).subscribe(
        (data: Response) => {
        let channelInfoList = data.json()
        let iterations = 0

        // Find current channel
        try {
          channelInfoList.forEach(channelInfo => {
            console.log(++iterations)
            if (this.channelName == channelInfo.name) {
              this.isChannelExist = true
              this.channelInfo = channelInfo
              throw BreakException
            }
          })
        } catch(error) {
          if (error !== BreakException) {
            throw error
          }
        }

        // Get channel
        if (this.isChannelExist) {
          this.httpService.getData(this.channelInfo.link).subscribe(
            (rssData: Response) => {
            let rssXml = rssData.text()
            this.channel = parseRss(rssXml, this.channelInfo)
            // console.log(this.channel.title)
            // console.log(this.channel)
            this.channelTitle = this.channel.title
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
}

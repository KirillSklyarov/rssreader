import { Component, OnInit, OnDestroy } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'

import { ActivatedRoute} from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { Channel, parseRss } from './../rss/channel'
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
  channelTitle = ""

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
        channelList.forEach(channel => {
          if (!this.channelIsExist) {
            if (this.channelName === channel.name) {
              this.channelIsExist = true
              this.channelInfo = channel
            }
          }
        })

        // Get channel
        if (this.channelIsExist) {
          this.httpService.getData(this.channelInfo.link).
          subscribe((rssData: Response) => {
            let rssXml = rssData.text()
            this.channel = parseRss(rssXml, this.channelInfo)
            console.log(this.channel.title)
            console.log(this.channel)
            this.channelTitle = this.channel.title
            this.channel.items.forEach((item) => {
              console.log(item.description)
            })
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

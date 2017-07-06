import { Component, OnInit, OnDestroy, Input } from '@angular/core'
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
  selector: 'message-app',
  templateUrl: './../pages/message.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class MessageComponent /*implements OnInit, OnDestroy*/ {

  channelName: string
  messageId: string
  private subscription: Subscription;

  constructor(private httpService: HttpService,
    private activateRoute: ActivatedRoute){
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.channelName = params['channel']
      this.messageId = params['id']
      this.httpService.getData('assets/data/rsschannels.json').subscribe(
        (data: Response) => {
          let channelList = data.json()
        }
      )
    })
  }

}

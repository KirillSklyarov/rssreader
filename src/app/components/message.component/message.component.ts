import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../../services/http.service'

import { ActivatedRoute} from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { Channel, parseRss } from './../../rss/channel'
import { Item } from './../../rss/item'
import { Image } from './../../rss/image'
import { TextInput } from './../../rss/textinput'
import { BackendChannelInfo } from './../../rss/backendchannelinfo'

import { BreakException } from './../../libs/breakexception'
import { FEEDS_DATABASE_LINK } from './../../libs/feedsdatabaselink'

@Component({
  selector: 'message-app',
  templateUrl: './message.html',
  styleUrls: ['./../../styles/style.css'],
  providers: [HttpService]
})
export class MessageComponent /*implements OnInit, OnDestroy*/ {

  channelInfo: BackendChannelInfo
  channel: Channel
  channelName: string
  itemId: number
  isItemExist = false
  isItemDescriptionExist = false
  itemTitle = ''
  itemDescription = ''
  itemLink = ''
  channelIsExist = false
  messageIsExist = false

  private subscription: Subscription;

  constructor(private httpService: HttpService,
    private activateRoute: ActivatedRoute){
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.channelName = params['channel']
      this.httpService.getData(FEEDS_DATABASE_LINK).subscribe(
        (data: Response) => {
          let channelList = data.json()

          try {
            channelList.forEach(channelInfo => {
              if (this.channelName == channelInfo.name) {
                this.channelIsExist = true
                this.channelInfo = channelInfo
                throw BreakException
              }
            })
          } catch(error) {
            if (error !== BreakException) {
              throw error
            }
          }

          if (this.channelIsExist) {
            this.subscription = this.activateRoute.params.subscribe(params => {
              this.itemId = Number(params['itemId'])
              this.httpService.getData(this.channelInfo.link).subscribe(
                (rssData: Response) => {
                  let rssXml = rssData.text()
                  this.channel = parseRss(rssXml, this.channelInfo)
                  console.log(this.channel.items[this.itemId])
                  if (this.channel.items[this.itemId]) {
                    this.isItemExist = true
                    this.itemTitle = this.channel.items[this.itemId].title
                    this.itemLink = this.channel.items[this.itemId].link
                    if (this.channel.items[this.itemId].description) {
                      this.isItemDescriptionExist = true
                      this.itemDescription = this.channel.items[this.itemId].
                      description
                    }
                  } else {
                    console.error('Item not found')
                  }
                }
              )
            })
          }
        }
      )
    })
  }
}

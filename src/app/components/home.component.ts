import { Component, OnInit } from '@angular/core'
import { Response } from '@angular/http'
import { HttpService } from './../services/http.service'
import { Channel } from './../rss/channel'

@Component({
  selector: 'home-app',
  templateUrl: './../pages/home.html',
  styleUrls: ['./../styles/style.css'],
  providers: [HttpService]
})
export class HomeComponent {

  channels: Channel[] = []
  channel: string = ''

  constructor (private httpService: HttpService) { }


  isListEmpty (): boolean {
    if (this.channels.length > 0) { return true }
    return false
  }
}

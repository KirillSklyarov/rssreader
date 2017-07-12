import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.html',
  styleUrls: ['./../../styles/style.css']
})
export class NavigationComponent {
  @Input() navigationLevel: number;
  @Input() channelName: string;
  @Input() itemId: number;
  @Input() isChannelExist: boolean;
  @Input() isItemExist: boolean;
}

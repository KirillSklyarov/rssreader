import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ChannelService } from './../services/channel.service/channel.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './../components/app.component';
import { HomeComponent } from './../components/home.component/home.component';
import { ChannelComponent } from './../components/channel.component/channel.component';
import { MessageComponent } from './../components/message.component/message.component';

import { HomeStatisticComponent } from './../components/home.component/home-statistic.component';
import { ChannelStatisticComponent } from './../components/channel.component/channel-statistic.component';
import { MessageStatisticComponent } from './../components/message.component/message-statistic.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'channel/:channelName', component: ChannelComponent },
  { path: 'channel/:channelName/message/:itemId', component: MessageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChannelComponent,
    MessageComponent,
    HomeStatisticComponent,
    ChannelStatisticComponent,
    MessageStatisticComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }

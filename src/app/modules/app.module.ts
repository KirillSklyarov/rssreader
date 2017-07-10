import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router'
import { HttpService } from './../services/http.service/http.service'
import { ChannelService } from './../services/channel.service/channel.service'

import { AppComponent } from './../components/app.component'
import { HomeComponent } from
  './../components/home.component/home.component'
import { ChannelComponent } from
  './../components/channel.component/channel.component'
import { MessageComponent } from
  './../components/message.component/message.component'
import { StatisticComponent } from
  './../components/statistic.component/statistic.component'

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'channel/:channel', component: ChannelComponent },
  { path: 'channel/:channelName/message/:itemId', component: MessageComponent },
  { path: 'statistic', component: StatisticComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChannelComponent,
    MessageComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService, ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }

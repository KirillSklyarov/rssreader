import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router'
import { HttpService } from './../services/http.service'

import { AppComponent } from './../components/app.component'
import { HomeComponent } from './../components/home.component'
import { ChannelComponent } from './../components/channel.component'
import { MessageComponent } from './../components/message.component'

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'channel/:channel', component: ChannelComponent },
  { path: 'channel/:channel/message/:id', component: MessageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChannelComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

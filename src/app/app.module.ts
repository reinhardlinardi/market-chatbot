import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { App } from './app.component';

import { ChatPage } from '../pages/chat/chat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    App,
    ChatPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App, {
      /* Configurations */
      platforms: { 
        android: { 
          activator: 'none' // turn off animation on click
        } 
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}

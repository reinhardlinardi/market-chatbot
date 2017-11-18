import { Component } from '@angular/core';
/* import { IonicPage, NavController, NavParams } from 'ionic-angular'; */
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* Create model to be passed to view */
class Command {
  val: string;
}

//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})

export class ChatPage {

  /* Properties */
  command: Command; // Add model as property of class

  /* Methods */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.command = new Command(); // Create new instance of model in Constructor
  }

  runCommand(command : Command) {
    
    // If command.val is not falsy
    if(command.val) {
      alert('Command : ' + command.val);
    }
  }
}

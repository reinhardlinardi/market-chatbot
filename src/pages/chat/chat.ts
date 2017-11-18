import { Component, ViewChild } from '@angular/core';
/* import { IonicPage, NavController, NavParams } from 'ionic-angular'; */
import { NavController, NavParams, Content } from 'ionic-angular';

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
  @ViewChild('scrollable') content: Content; // get view DOM matching tag #scrollable

  /* Properties */
  command: Command; // Add model as property of class
  public items: any[] = []; // Chatboxes
  
  /* Constants */
  greeting: string = "Halo! Selamat datang! Terima kasih telah menambahkan saya sebagai teman. Ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";
  help: string = "-- Bantuan -- \n\nGunakan keyword yang tersedia di bawah ini. \n\nCari : Mencari barang \n\nContoh : Cari kamera";
  error: string = "Keyword yang anda masukkan salah. Silahkan coba lagi.";

  /* Methods */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.command = new Command(); // Create new instance of model in Constructor

    // Send greeting message
    this.items.push({ container: "chatbox-container-bot", type: "chatbox-bot", chat: this.greeting });
  }

  // Evaluate command given by user
  runCommand(command : Command) {
    
    // If command.val is not falsy
    if(command.val) {
      this.items.push({ container: "chatbox-container-user", type: "chatbox-user", chat: command.val});

      // Scroll to latest chat
      this.content.scrollTo(0, this.content.scrollHeight); // scroll to bottom of content

      // Bot action
      this.botAction(command.val);

      // Reset model (and view, via data binding)
      command.val = "";
    }
  }

  botAction(input: string) {
    let lower_input: string = input.toLowerCase(); // convert to lowercase first
    
    // Regex for string matching
    let re_bantuan = /bantuan/;

    if(lower_input.search(re_bantuan) == -1) {
      this.items.push({ container: "chatbox-container-bot", type: "chatbox-bot", chat: this.error });
    }
    else this.items.push({ container: "chatbox-container-bot", type: "chatbox-bot", chat: this.help });
  }
}

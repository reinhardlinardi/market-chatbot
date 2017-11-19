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
  public chatboxes: any[] = []; // Chatboxes
  
  /* Constants */
  greeting: string = "Halo! Selamat datang! Terima kasih telah menambahkan saya sebagai teman. Ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";
  help: string = "-- Bantuan --\n\nGunakan perintah yang tersedia di bawah ini.\n\n"
                  + "<b>Cari :</b>\nMencari barang\n"
                  + "<b>Keranjang :</b>\nMenampilkan semua barang di keranjang\n"
                  + "<b>Pembayaran :</b>\nMelanjutkan ke pembayaran\n"
                  + "<b>Metode Pembayaran :</b>\nMenampilkan atau mengubah metode pembayaran\n"
                  + "<b>Alamat Tujuan :</b>\nMenampilkan atau mengubah alamat tujuan\n\n"
                  + "Contoh penggunaan perintah :\n\n"
                  + "<b>Cari :</b> <u>Cari</u> kamera\n"
                  + "<b>Keranjang :</b> <u>Keranjang</u>\n"
                  + "<b>Pembayaran :</b> <u>Pembayaran</u>\n"
                  + "<b>Metode Pembayaran :</b> <u>Metode Pembayaran</u>\n"
                  + "<b>Alamat Tujuan :</b> <u>Alamat Tujuan</u>\n";


  error: string = "Perintah yang anda masukkan salah. Silahkan coba lagi atau ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";

  /* Methods */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.command = new Command(); // Create new instance of model in Constructor

    // Send greeting message
    this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", chat: this.greeting });
  }

  // Evaluate command given by user
  runCommand(command : Command) {
    
    // If command.val is not falsy
    if(command.val) {
      this.content.resize(); // Recalculate content dimensions
      if(this.content.scrollHeight > this.content.contentHeight ) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll

      this.chatboxes.push({ container: "chatbox-container-user", type: "chatbox-user", chat: command.val}); // Show user's chatbox
      this.botAction(command.val); // Bot action
      command.val = ""; // Reset model (and view, via data binding)
    }
  }

  // Action taken by bot
  botAction(input: string) {
    let lower_input: string = input.toLowerCase(); // Convert to lowercase first
    
    // Regex for string matching
    let re_bantuan = /^\s*bantuan\s*$/;
    
    // Match each keyword
    let match_bantuan = re_bantuan.exec(lower_input);

    // Decide response
    if(match_bantuan != null) this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", chat: this.help }); // Menu bantuan
    else this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", chat: this.error });
  }
}

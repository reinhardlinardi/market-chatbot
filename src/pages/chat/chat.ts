import { Component, ViewChild } from '@angular/core';
/* import { IonicPage, NavController, NavParams } from 'ionic-angular'; */
import { NavController, NavParams } from 'ionic-angular';
import { Content } from 'ionic-angular';

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
  public chatboxes: any[] = []; // Array of chatboxes
  public address: string[] = ["jkt","bdg"]; // Array of address
  
  /* Constants */
  greeting: string = "Halo! Selamat datang! Terima kasih telah menambahkan saya sebagai teman. Ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";
  help: string = "-- Bantuan --\n\nAnda dapat menggunakan perintah yang tersedia di bawah ini.\n\n"
                  + "<b>Cari :</b>\nMencari barang berdasarkan nama barang\n"
                  + "<b>Keranjang :</b>\nMenampilkan semua barang yang ada di keranjang\n"
                  + "<b>Bayar :</b>\nMelanjutkan ke tahap pembayaran\n"
                  + "<b>Metode :</b>\nMenampilkan atau mengubah metode pembayaran\n"
                  + "<b>Alamat :</b>\nMenampilkan atau mengubah alamat kirim\n\n"
                  + "Contoh penggunaan perintah sebagai berikut :\n\n"
                  + "<b>Cari :</b> <u>Cari</u> kamera\n"
                  + "<b>Keranjang :</b> <u>Keranjang</u>\n"
                  + "<b>Bayar :</b> <u>Bayar</u>\n"
                  + "<b>Metode :</b> <u>Metode</u>\n"
                  + "<b>Alamat :</b> <u>Alamat</u>\n";

  address_header: string = "-- Alamat Kirim --\n\nDaftar alamat kirim Anda yang tersimpan saat ini :\n\n";
  address_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah atau menghapus alamat kirim.\n\n"
                            + "<b>Tambah :</b>\nMenambahkan alamat kirim baru\n"
                            + "<b>Hapus :</b>\nMenghapus alamat kirim\n\n"
                            + "Contoh penggunaan perintah sebagai berikut :\n\n"
                            + "<b>Tambah :</b> <u>Tambah</u>\n"
                            + "<b>Hapus :</b> <u>Hapus</u>\n";
  error: string = "Perintah yang anda masukkan salah. Silahkan coba lagi atau ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";

  /* Methods */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.command = new Command(); // Create new instance of model in Constructor

    // Send greeting message
    this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: this.greeting });
  }

  // Evaluate command given by user
  runCommand(command : Command) {
    
    // If command.val is not falsy
    if(command.val) {
      this.content.resize(); // Recalculate content dimensions
      if(this.content.scrollHeight > this.content.contentHeight) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll

      this.chatboxes.push({ container: "chatbox-container-user", type: "chatbox-user", content: "text", data: command.val}); // Show user's chatbox
      this.botAction(command.val); // Bot action
      command.val = ""; // Reset model (and view, via data binding)
    }
  }

  // Action taken by bot
  botAction(input: string) {
    let lower_input: string = input.toLowerCase(); // Convert to lowercase first
    
    // Regex for string matching
    let re_bantuan = /^\s*bantuan\s*$/;
    let re_cari = /^\s*cari\s*$/;
    let re_keranjang = /^\s*keranjang\s*$/;
    let re_bayar = /^\s*bayar\s*$/;
    let re_metode = /^\s*metode\s*$/;
    let re_alamat = /^\s*alamat\s*$/;
    
    // Match each keyword
    let match_bantuan = re_bantuan.exec(lower_input);
    let match_cari = re_cari.exec(lower_input);
    let match_keranjang = re_keranjang.exec(lower_input);
    let match_bayar = re_bayar.exec(lower_input);
    let match_metode = re_metode.exec(lower_input);
    let match_alamat = re_alamat.exec(lower_input);

    // Decide response
    if(match_bantuan != null) this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: this.help }); // Menu bantuan
    else if(match_alamat != null){
      this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "list", header: this.address_header, footer: this.address_footer, data: "address" });
    }
    else this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: this.error });
  }
}

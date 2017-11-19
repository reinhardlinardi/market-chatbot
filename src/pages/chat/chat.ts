import { Component, ViewChild } from '@angular/core';
/* import { IonicPage, NavController, NavParams } from 'ionic-angular'; */
import { NavController, NavParams } from 'ionic-angular';
import { Content, AlertController } from 'ionic-angular';

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
  stack: string[] = []; // Command stack

  public address: string[] = []; // Array of address
  public method: string[] = []; // Array of payment methods
  
  /* Constants */
  greeting: string = "Halo! Selamat datang! Saya adalah chatbot yang dapat membantu kamu berbelanja. Ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";
  help: string = "-- Bantuan --\n\nAnda dapat menggunakan perintah yang tersedia di bawah ini.\n\n"
                  + "<b>Cari :</b>\nMencari barang berdasarkan nama barang.\n"
                  + "<b>Keranjang :</b>\nMenampilkan semua barang yang ada di keranjang.\n"
                  + "<b>Bayar :</b>\nMelanjutkan ke tahap pembayaran.\n"
                  + "<b>Metode :</b>\nMenampilkan atau mengubah metode pembayaran.\n"
                  + "<b>Alamat :</b>\nMenampilkan atau mengubah alamat kirim.\n"
                  + "<b>Batal : </b>\nMembatalkan pilihan, kembali ke pilihan sebelumnya.\n\n"
                  + "Contoh penggunaan perintah sebagai berikut :\n\n"
                  + "<b>Cari :</b> <u>Cari</u> kamera\n"
                  + "<b>Keranjang :</b> <u>Keranjang</u>\n"
                  + "<b>Bayar :</b> <u>Bayar</u>\n"
                  + "<b>Metode :</b> <u>Metode</u>\n"
                  + "<b>Alamat :</b> <u>Alamat</u>\n"
                  + "<b>Batal :</b> <u>Batal</u>\n";

  address_header: string = "-- Alamat Kirim --\n\nDaftar alamat kirim Anda :\n\n";
  address_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah atau menghapus alamat kirim.\n\n"
                            + "<b>Tambah :</b>\nMenambahkan alamat kirim baru. Jika alamat sudah terdaftar, alamat tidak akan ditambahkan.\n"
                            + "<b>Hapus :</b>\nMenghapus alamat kirim.\n\n"
                            + "Contoh penggunaan perintah sebagai berikut :\n\n"
                            + "<b>Tambah :</b> <u>Tambah</u>\n"
                            + "<b>Hapus :</b> <u>Hapus</u>\n";
  method_header: string = "-- Metode Pembayaran --\n\nDaftar metode pembayaran Anda:\n\n";
  method_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah atau menghapus metode pembayaran.\n\n"
                            + "<b>Tambah :</b>\nMenambahkan metode pembayaran baru.\n"
                            + "<b>Hapus :</b>\nMenghapus metode pembayaran.\n\n"
                            + "Contoh penggunaan perintah sebagai berikut :\n\n"
                            + "<b>Tambah :</b> <u>Tambah</u>\n"
                            + "<b>Hapus :</b> <u>Hapus</u>\n";
  error: string = "Perintah yang anda masukkan salah. Silahkan coba lagi atau ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";

  /* Methods */
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
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
    let re_batal = /^\s*batal\s*$/;
    let re_tambah = /^\s*tambah\s*$/;
    let re_hapus = /^\s*hapus\s*$/;
    
    // Match each keyword
    let match_bantuan = re_bantuan.exec(lower_input);
    let match_cari = re_cari.exec(lower_input);
    let match_keranjang = re_keranjang.exec(lower_input);
    let match_bayar = re_bayar.exec(lower_input);
    let match_metode = re_metode.exec(lower_input);
    let match_alamat = re_alamat.exec(lower_input);
    let match_batal = re_batal.exec(lower_input);
    let match_tambah = re_tambah.exec(lower_input);
    let match_hapus = re_hapus.exec(lower_input);

    // Decide response
    if(match_batal != null) { // Batal
      //this.stack = [];
      // set match_something = true
    }

    if(match_bantuan != null) this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: this.help }); // Bantuan
    else if(match_alamat != null) { // Alamat
      this.stack = [];
      this.stack.push("alamat");
      this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "list", header: this.address_header, footer: this.address_footer, data: "address" });
    }
    else if(match_metode != null) { // Metode
      this.stack = [];
      this.stack.push("metode");
      this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "list", header: this.method_header, footer: this.method_footer, data: "method" });
    }
    else if(match_tambah != null) { // Tambah
      let prev_command: string = this.stack[this.stack.length - 1];

      if(prev_command == "alamat") this.addAddress();
      else this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: "Tidak ada data yang dapat ditambahkan." });
    }
    else if(match_hapus != null) { // Hapus
      let prev_command: string = this.stack[this.stack.length - 1];
      
      if(prev_command == "alamat") {
        if(this.address.length) this.removeAddress();
        else this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: "Tidak ada alamat kirim yang terdaftar." }); 
      }
      else this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: "Tidak ada data yang dapat dihapus." });
    }
    // Error
    else this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: this.error });
  }

  newValidAddress(new_address: string) {
    return !(this.address.indexOf(new_address) > -1);
  }

  addAddress() {
    let alert = this.alertCtrl.create({
      title: 'Tambah Alamat Kirim',
      inputs: [{
          name: 'address',
          placeholder: 'Alamat kirim baru'
        }],
      buttons: [{
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Tambah',
          handler: data => {

            if(data.address == "") this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: "Alamat kosong." });
            else {
              if(this.newValidAddress(data.address)) {
                this.address.push(data.address);
                this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: "Alamat berhasil ditambahkan." });
              } else this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: "Alamat sudah terdaftar." });
            }

            this.content.resize(); // Recalculate content dimensions
            if(this.content.scrollHeight > this.content.contentHeight) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll
          }
        }
      ]
    });

    alert.present();
  }

  getAddress() {
    let all: any[] = [];
    let length = this.address.length;

    for(let cnt=0; cnt<length; cnt++) {
      all.push({ type: 'checkbox', value: cnt, label: this.address[cnt] });
    }
    
    return all;
  }

  removeAddress() {
    let alert = this.alertCtrl.create({
      title: 'Hapus Alamat Kirim',
      inputs: this.getAddress(),
      buttons: [{
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: data => {
            let checked: boolean = false;

            for(let index of data) {
              checked = true;
              delete this.address[index];
            }

            this.address = this.address.filter(x => true);
            
            if(checked) this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: "Alamat berhasil dihapus." });
            else this.chatboxes.push({ container: "chatbox-container-bot", type: "chatbox-bot", content: "text", data: "Tidak ada alamat yang dipilih." });

            this.content.resize(); // Recalculate content dimensions
            if(this.content.scrollHeight > this.content.contentHeight) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll
          }
        }
      ]
    });

    alert.present();
  }
}

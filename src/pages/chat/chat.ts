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
  
  public cart: any[] = [1]; // Cart
  public cart_detail: any[] = [];
  public all_item: any[] = []; // Array of all searched item
  current_item: string = ""; // Current searched item
  
  public item: any = // Array of item
  [
    {
      id: 1,
      keyword: 'kamera',
      name : 'Kamera',
      brand: 'Canon',
      price: 3000000
    },
    {
      id: 2,
      keyword: 'kamera',
      name: 'Kamera',
      brand: 'Sony',
      price: 2500000
    }
  ]; 
  
  /* Constants */
  greeting: string = "Halo! Selamat datang! Saya adalah chatbot yang dapat membantu kamu berbelanja. Ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";
  help: string = "-- Bantuan --\n\nAnda dapat menggunakan perintah yang tersedia di bawah ini.\n\n"
                  + "<b>Cari :</b>\nMencari barang berdasarkan nama barang.\n"
                  + "<b>Keranjang :</b>\nMenampilkan semua barang yang ada di keranjang.\n"
                  + "<b>Bayar :</b>\nMelanjutkan ke tahap pembayaran.\n"
                  + "<b>Metode :</b>\nMenampilkan atau mengubah metode pembayaran.\n"
                  //+ "<b>Alamat :</b>\nMenampilkan atau mengubah alamat kirim.\n"
                  + "<b>Alamat :</b>\nMenampilkan atau mengubah alamat kirim.\n\n"
                  //+ "<b>Batal : </b>\nMembatalkan pilihan, kembali ke pilihan sebelumnya.\n\n"
                  + "Contoh penggunaan perintah sebagai berikut :\n\n"
                  + "<b>Cari :</b> <u>Cari</u> kamera\n"
                  + "<b>Keranjang :</b> <u>Keranjang</u>\n"
                  + "<b>Bayar :</b> <u>Bayar</u>\n"
                  + "<b>Metode :</b> <u>Metode</u>\n"
                  + "<b>Alamat :</b> <u>Alamat</u>\n";
                  //+ "<b>Batal :</b> <u>Batal</u>\n";

  address_header: string = "-- Alamat Kirim --\n\nDaftar alamat kirim Anda :\n\n";
  address_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah atau menghapus alamat kirim.\n\n"
                            + "<b>Tambah :</b>\nMenambahkan alamat kirim baru. Jika alamat sudah terdaftar, alamat tidak akan ditambahkan.\n"
                            + "<b>Hapus :</b>\nMenghapus alamat kirim.\n\n"
                            + "Contoh penggunaan perintah sebagai berikut :\n\n"
                            + "<b>Tambah :</b> <u>Tambah</u>\n"
                            + "<b>Hapus :</b> <u>Hapus</u>\n";
  method_header: string = "-- Metode Pembayaran --\n\nDaftar metode pembayaran Anda :\n\n";
  method_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah atau menghapus metode pembayaran.\n\n"
                            + "<b>Tambah :</b>\nMenambahkan metode pembayaran baru.\n"
                            + "<b>Hapus :</b>\nMenghapus metode pembayaran.\n\n"
                            + "Contoh penggunaan perintah sebagai berikut :\n\n"
                            + "<b>Tambah :</b> <u>Tambah</u>\n"
                            + "<b>Hapus :</b> <u>Hapus</u>\n";
  item_header: string = "-- Hasil Pencarian --\n\nHasil pencarian barang :\n\n";
  item_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah barang ke keranjang atau menghapus barang dari keranjang.\n\n"
                            + "<b>Tambah :</b>\nMenambahkan barang ke keranjang.\n"
                            + "<b>Hapus :</b>\nMenghapus barang dari keranjang.\n\n"
                            + "Contoh penggunaan perintah sebagai berikut :\n\n"
                            + "<b>Tambah :</b> <u>Tambah</u>\n"
                            + "<b>Hapus :</b> <u>Hapus</u>\n";
  cart_header: string = "-- Keranjang --\n\nKeranjang Anda :\n\n";
  cart_footer: string = "";

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
    let re_cari = /^\s*cari\s*(.+)$/;
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


    /* --------------- Response --------------- */

    if(match_batal != null) // Batal
    {
      //this.stack = [];
      // set match_something = true
    }

    // Bantuan
    if(match_bantuan != null) this.chatboxes.push({ 
      container: "chatbox-container-bot", type: "chatbox-bot", 
      content: "text", data: this.help 
    }); 
    else if(match_alamat != null) // Alamat
    { 
      this.stack = [];
      this.stack.push("alamat");
      this.chatboxes.push({ 
        container: "chatbox-container-bot", type: "chatbox-bot", 
        content: "list", header: this.address_header, footer: this.address_footer, data: "address" 
      });
    }
    else if(match_metode != null) // Metode
    { 
      this.stack = [];
      this.stack.push("metode");
      this.chatboxes.push({ 
        container: "chatbox-container-bot", type: "chatbox-bot", 
        content: "list", header: this.method_header, footer: this.method_footer, data: "method" 
      });
    }
    else if(match_cari != null) // Cari
    {
      this.stack = [];
      this.stack.push("cari");

      let item:string = match_cari[1].toLowerCase();
      this.all_item = this.getAllItem(item);

      if(this.all_item.length) { // If any
        this.current_item = item;        
        let detail = this.item[item];
        
        this.chatboxes.push({
          container: "chatbox-container-bot", type: "chatbox-bot", 
          content: "list", header: this.item_header, footer: this.item_footer, data: "item", key: item
        })
      }
      else {
        this.current_item = "";
        this.chatboxes.push({ // If nothing
          container: "chatbox-container-bot", type: "chatbox-bot", 
          content: "text", data: "Maaf, barang yang Anda cari tidak ditemukan."
        });
      }
    }
    else if(match_keranjang != null) {
      for(let id of this.cart) this.cart_detail.push(this.getDetailById(id));

      this.chatboxes.push({
        container: "chatbox-container-bot", type: "chatbox-bot", 
        content: "list", header: this.cart_header, footer: this.cart_footer, data: "cart"
      })
    }
    else if(match_tambah != null) // Tambah
    {
      let prev_command: string = this.stack[this.stack.length - 1];

      if(prev_command == "alamat") this.addAddress(); /* Address */
      else if(prev_command == "metode")
      {
        if(this.method.length != 2) this.addMethod(); /* Method */
        else this.chatboxes.push({ 
          container: "chatbox-container-bot", type: "chatbox-bot", 
          content: "text", data: "Semua metode pembayaran sudah terdaftar." 
        });
      }
      else if(prev_command == "cari") {
        if(this.getAvailableItem(this.current_item).length) this.addItem(this.current_item);
        else this.chatboxes.push({ 
          container: "chatbox-container-bot", type: "chatbox-bot", 
          content: "text", data: "Semua barang sudah dimasukkan ke keranjang." 
        });
      }
      else this.chatboxes.push({ 
        container: "chatbox-container-bot", type: "chatbox-bot", 
        content: "text", data: "Tidak ada data yang dapat ditambahkan." 
      });
    }
    else if(match_hapus != null) // Hapus
    {
      let prev_command: string = this.stack[this.stack.length - 1];
      
      if(prev_command == "alamat") /* Address */
      {
        if(this.address.length) this.removeAddress();
        else this.chatboxes.push({ 
          container: "chatbox-container-bot", type: "chatbox-bot", 
          content: "text", data: "Tidak ada alamat kirim yang terdaftar." 
        });
      }
      else if(prev_command == "metode") /* Method */
      {
        if(this.method.length) this.removeMethod();
        else this.chatboxes.push({ 
          container: "chatbox-container-bot", type: "chatbox-bot", 
          content: "text", data: "Tidak ada metode pembayaran yang terdaftar." 
        });
      }
      else this.chatboxes.push({ 
        container: "chatbox-container-bot", type: "chatbox-bot", 
        content: "text", data: "Tidak ada data yang dapat dihapus." 
      });
    }
    // Error
    else this.chatboxes.push({ 
      container: "chatbox-container-bot", type: "chatbox-bot", 
      content: "text", data: this.error 
    });
  }

  
  /* --------------- Alerts --------------- */

  /* Address */
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

            if(data.address == "") this.chatboxes.push({ // If empty string
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Alamat kosong." 
            });
            else {
              if(this.newValidAddress(data.address)) { // If address not listed yet
                this.address.push(data.address);
                this.chatboxes.push({ 
                  container: "chatbox-container-bot", type: "chatbox-bot", 
                  content: "text", data: "Alamat berhasil ditambahkan." 
                });
              } else this.chatboxes.push({ // If address listed
                container: "chatbox-container-bot", type: "chatbox-bot", 
                content: "text", data: "Alamat sudah terdaftar." 
              });
            }

            this.content.resize(); // Recalculate content dimensions
            if(this.content.scrollHeight > this.content.contentHeight) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll
          }
        }
      ]
    });

    alert.present();
  }

  getAddress(style: string) {
    let all: any[] = [];
    let length = this.address.length;

    for(let cnt=0; cnt<length; cnt++) {
      all.push({ type: style, value: cnt, label: this.address[cnt] });
    }
    
    return all;
  }

  removeAddress() {
    let alert = this.alertCtrl.create({
      title: 'Hapus Alamat Kirim',
      inputs: this.getAddress('checkbox'),
      buttons: [{
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: data => {

            for(let index of data) delete this.address[index];
            this.address = this.address.filter(x => true);
            
            if(data.length) this.chatboxes.push({ // If any
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Alamat berhasil dihapus." 
            });
            else this.chatboxes.push({ // If nothing
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Tidak ada alamat yang dipilih." 
            });

            this.content.resize(); // Recalculate content dimensions
            if(this.content.scrollHeight > this.content.contentHeight) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll
          }
        }
      ]
    });

    alert.present();
  }


  /* Method */
  getAvailableMethod() {
    let all: any[] = ['Transfer', 'Kartu Kredit'];
    let missing: any[] = [];
    let length = all.length;

    for(let cnt=0; cnt<length; cnt++) {
      if(this.method.indexOf(all[cnt]) == -1) missing.push({ type: 'checkbox', value: all[cnt], label: all[cnt] });
    }
    
    return missing;
  }

  addMethod() {
    let alert = this.alertCtrl.create({
      title: 'Tambah Metode Pembayaran',
      inputs: this.getAvailableMethod(),
      buttons: [{
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Tambah',
          handler: data => {
            
            for(let option of data) this.method.push(option);

            if(data.length) this.chatboxes.push({ // If any
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Metode pembayaran berhasil ditambahkan."
            });
            else this.chatboxes.push({ // If nothing
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Tidak ada metode pembayaran yang dipilih." 
            });

            this.content.resize(); // Recalculate content dimensions
            if(this.content.scrollHeight > this.content.contentHeight) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll
          }
        }
      ]
    });

    alert.present();
  }

  getMethod(style: string) {
    let all: any[] = [];
    let length = this.method.length;

    for(let cnt=0; cnt<length; cnt++) {
      all.push({ type: style, value: cnt, label: this.method[cnt] });
    }
    
    return all;
  }

  removeMethod() {
    let alert = this.alertCtrl.create({
      title: 'Hapus Metode Pembayaran',
      inputs: this.getMethod('checkbox'),
      buttons: [{
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: data => {

            for(let index of data) delete this.method[index];
            this.method = this.method.filter(x => true);
            
            if(data.length) this.chatboxes.push({ // If any
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Metode pembayaran berhasil dihapus." 
            });
            else this.chatboxes.push({ // If nothing
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Tidak ada metode pembayaran yang dipilih." 
            });

            this.content.resize(); // Recalculate content dimensions
            if(this.content.scrollHeight > this.content.contentHeight) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll
          }
        }
      ]
    });

    alert.present();
  }


  /* Items */
  getAllItem(key: string) {
    return this.item.filter(x => x['keyword'] == key);
  }

  getDetailById(id: number) {
    return this.item.filter(x => x['id'] == id);
  }

  getAvailableItem(key: string) {
    let all: any[] = this.item.filter(x => x['keyword'] == key);
    let missing: any[] = [];
    let length = all.length;

    for(let cnt=0; cnt<length; cnt++) {
      if(this.cart.indexOf(all[cnt]['id']) == -1) missing.push({ type: 'checkbox', value: all[cnt]['id'], label: all[cnt]['brand'] + ", Rp " + all[cnt]['price'] });
    }
    
    return missing;
  }

  addItem(key: string) {
    let alert = this.alertCtrl.create({
      title: 'Tambah Ke Keranjang',
      inputs: this.getAvailableItem(key),
      buttons: [{
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Tambah',
          handler: data => {
            
            for(let option of data) this.cart.push(this.item[key][option]['id']);

            if(data.length) this.chatboxes.push({ // If any
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Barang berhasil ditambahkan ke keranjang."
            });
            else this.chatboxes.push({ // If nothing
              container: "chatbox-container-bot", type: "chatbox-bot", 
              content: "text", data: "Tidak ada barang yang dipilih."
            });

            this.content.resize(); // Recalculate content dimensions
            if(this.content.scrollHeight > this.content.contentHeight) this.content.scrollTo(0, this.content.scrollHeight); // Scroll to user's latest chat if content has a scroll
          }
        }
      ]
    });

    alert.present();
  }
}

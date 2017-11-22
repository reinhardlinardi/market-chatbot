import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Content, AlertController } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


/* -------------------- Model -------------------- */

class Command {
  val: string;
}


/* -------------------- Component -------------------- */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})


/* -------------------- Class -------------------- */

export class ChatPage {

  /* -------------------- Properties -------------------- */


  /* ------------ Model to bind to UI Component  ------------ */

  @ViewChild('scrollable') content: Content; // get view DOM matching tag #scrollable
  command: Command; // Add model as property of class


  /* ------------ Command stack  ------------ */
  
  stack: string = ""; // Command stack


  /* ------------ Array of chatboxes  ------------ */

  public chatboxes: any[] = []; // Array of chatboxes


  /* ------------ Address and Methods  ------------ */

  public address: string[] = ["Bandung"]; // Array of address
  public method: string[] = ["Transfer", "Kartu Kredit"]; // Array of payment methods
  

  /* ------------ Cart and details  ------------ */

  public cart: any[] = [1]; // Cart
  public cart_detail: any[] = [{
    id: 1,
    keyword: 'kamera',
    name : 'Kamera',
    brand: 'Canon',
    price: 3000000
  }]; // Details for items in cart


  /* ------------ Items  ------------ */

  current_item: string = ""; // Current searched item
  public all_item: any[] = []; // Array of all searched item
  
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
      price: 500000
    }
  ];

  /* -------------------- Constants -------------------- */

  /* ------------ Greeting  ------------ */

  greetings: string[] = ["Halo! Selamat datang!",
                        "Saya adalah chatbot yang akan membantu kamu berberlanja.\n\n"
                        + "Jika kamu memerlukan bantuan, ketik \"Bantuan\"."];


  /* ------------ Help  ------------ */

  help: string = "-- Bantuan --"
                  + "\n\n"
                  + "Anda dapat menggunakan perintah yang tersedia di bawah ini."
                  + "\n\n"
                  + "<b>Cari :</b>\n"
                  + "Mencari barang berdasarkan nama barang.\n"
                  + "<b>Keranjang :</b>\n"
                  + "Menampilkan semua barang yang ada di keranjang.\n"
                  + "<b>Bayar :</b>\n"
                  + "Melanjutkan ke tahap pembayaran.\n"
                  + "<b>Metode :</b>\n"
                  + "Menampilkan atau mengubah metode pembayaran.\n"
                  + "<b>Alamat :</b>\nMenampilkan atau mengubah alamat kirim."
                  + "\n\n"
                  + "Contoh penggunaan perintah sebagai berikut :\n\n"
                  + "<b>Cari :</b> <u>Cari</u> kamera\n"
                  + "<b>Keranjang :</b> <u>Keranjang</u>\n"
                  + "<b>Bayar :</b> <u>Bayar</u>\n"
                  + "<b>Metode :</b> <u>Metode</u>\n"
                  + "<b>Alamat :</b> <u>Alamat</u>";


  /* ------------ Address  ------------ */

  address_header: string = "-- Alamat Kirim --"
                            + "\n\n"
                            + "Daftar alamat kirim Anda :"
                            + "\n\n";
  address_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah atau menghapus "
                            + "alamat kirim."
                            + "\n\n"
                            + "<b>Tambah :</b>\n"
                            + "Menambahkan alamat kirim baru. "
                            + "Jika alamat sudah terdaftar, alamat tidak akan ditambahkan.\n"
                            + "<b>Hapus :</b>\n"
                            + "Menghapus alamat kirim."
                            + "\n\n"
                            + "Contoh penggunaan perintah sebagai berikut :"
                            + "\n\n"
                            + "<b>Tambah :</b> <u>Tambah</u>\n"
                            + "<b>Hapus :</b> <u>Hapus</u>";


  /* ------------ Method  ------------ */

  method_header: string = "-- Metode Pembayaran --"
                            + "\n\n"
                            + "Daftar metode pembayaran Anda :"
                            + "\n\n";
  method_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah atau menghapus "
                            + "metode pembayaran."
                            + "\n\n"
                            + "<b>Tambah :</b>\n"
                            + "Menambahkan metode pembayaran baru.\n"
                            + "<b>Hapus :</b>\n"
                            + "Menghapus metode pembayaran."
                            + "\n\n"
                            + "Contoh penggunaan perintah sebagai berikut :"
                            + "\n\n"
                            + "<b>Tambah :</b> <u>Tambah</u>\n"
                            + "<b>Hapus :</b> <u>Hapus</u>";


  /* ------------ Item  ------------ */

  item_header: string = "-- Hasil Pencarian --"
                        + "\n\n"
                        + "Hasil pencarian barang :\n";
  item_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menambah barang ke keranjang."
                        + "atau menghapus barang dari keranjang."
                        + "\n\n"
                        + "<b>Tambah :</b>\n"
                        + "Menambahkan barang ke keranjang.\n"
                        + "<b>Hapus :</b>\n"
                        + "Menghapus barang dari keranjang."
                        + "\n\n"
                        + "Contoh penggunaan perintah sebagai berikut :"
                        + "\n\n"
                        + "<b>Tambah :</b> <u>Tambah</u>\n"
                        + "<b>Hapus :</b> <u>Hapus</u>";

  /* ------------ Cart  ------------ */

  cart_header: string = "-- Keranjang --"
                        + "\n\n"
                        + "Keranjang Anda :\n";
  cart_footer: string = "\nAnda dapat menggunakan perintah di bawah ini untuk menghapus barang dari keranjang."
                        + "\n\n"
                        + "<b>Hapus :</b>\n"
                        + "Menghapus barang dari keranjang."
                        + "\n\n"
                        + "Contoh penggunaan perintah sebagai berikut :"
                        + "\n\n"
                        + "<b>Hapus :</b> <u>Hapus</u>";

  /* ------------ Payment  ------------ */

  payment_header: string = "-- Pembayaran --"
                            + "\n\n"
                            + "Keranjang Anda :\n";
  payment_footer: string = "\nKetik \"OK\" untuk melanjutkan.";

  /* ------------ Error  ------------ */

  error: string = "Perintah yang anda masukkan salah. "
                  + "Silahkan coba lagi atau ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";


  /* ---------------------------- Methods ---------------------------- */


  /* --------------- Constructor --------------- */

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController)
  {
    // Create new instance of model in Constructor
    this.command = new Command();

    // Send greeting message
    for(let greeting of this.greetings) this.addChat("bot","text",greeting,"","","");
  }


  /* -------------------- Helper -------------------- */

  
  /* --------------- Add chat to chatroom  --------------- */

  addChat(sender: string, content: string, data: string, key: string, header: string, footer: string)
  {
    this.chatboxes.push(
      { 
        container: "chatbox-container-" + sender,
        type: "chatbox-" + sender,
        content: content,
        data: data,
        key: key,
        header: header,
        footer: footer 
      }
    );
  }

  /* --------------- Set command stack  --------------- */

  setStack(selection: string)
  {
    this.stack = selection;
  }

  /* --------------- Test previous command stack  --------------- */

  prevStack(command: string): boolean
  {
    return this.stack == command;
  }


  /* -------------------- Handler -------------------- */

  /* --------------- User  --------------- */
  
  runCommand(command : Command) { // Evaluate command given by user
    
    // If command.val is not falsy
    if(command.val) {

      // Recalculate content dimensions
      this.content.resize();

      // Scroll to user's latest chat if content has a scroll
      if(this.content.scrollHeight > this.content.contentHeight) {
        this.content.scrollTo(0, this.content.scrollHeight);
      }

      // Show user's chatbox
      this.addChat("user","text",command.val,"","","");

      // Bot action
      this.botAction(command.val); 
      
      // Reset model (and view, via data binding)
      command.val = "";
    }
  }


  /* --------------- Bot  --------------- */

  botAction(input: string) { // Action taken by bot

    // Convert to lowercase first
    let lower_input: string = input.toLowerCase();

    /* ------------ Pattern Matcher  ------------ */

    /* ------ Regex for string matching ------ */

    let re_bantuan = /^\s*bantuan\s*$/;
    let re_cari = /^\s*cari\s*(.+)$/;
    let re_keranjang = /^\s*keranjang\s*$/;
    let re_bayar = /^\s*bayar\s*$/;
    let re_metode = /^\s*metode\s*$/;
    let re_alamat = /^\s*alamat\s*$/;
    let re_tambah = /^\s*tambah\s*$/;
    let re_hapus = /^\s*hapus\s*$/;
    

    /* ------ Save regex match ------ */

    let match_bantuan = re_bantuan.exec(lower_input);
    let match_cari = re_cari.exec(lower_input);
    let match_keranjang = re_keranjang.exec(lower_input);
    let match_bayar = re_bayar.exec(lower_input);
    let match_metode = re_metode.exec(lower_input);
    let match_alamat = re_alamat.exec(lower_input);
    let match_tambah = re_tambah.exec(lower_input);
    let match_hapus = re_hapus.exec(lower_input);


    /* ------------ Response Categorization  ------------ */

    /* ------ Help ------ */

    if(match_bantuan != null)
    {
      this.chatboxes.push(
        { 
          container: "chatbox-container-bot",
          type: "chatbox-bot",
          content: "text",
          data: this.help 
        }
      );
    }

    /* ------ Address ------ */ 

    else if(match_alamat != null)
    {
      // Stack 
      this.setStack("alamat");
      
      // Push chatbox
      this.addChat("bot","list","address","",this.address_header,this.address_footer);
    }
    
    /* ------ Method ------ */
    
    else if(match_metode != null)
    { 
      // Stack
      this.setStack("metode");

      // Push chatbox
      this.addChat("bot","list","address","",this.method_header,this.method_footer);
    }
    
    /* ------ Search ------ */
    
    else if(match_cari != null)
    {
      // Stack
      this.setStack("cari");

      // Get keyword
      let item:string = match_cari[1].toLowerCase();
      this.all_item = this.getAllItem(item);

      // Check if keyword matches any item
      if(this.all_item.length)
      { 
        this.current_item = item;
        this.addChat("bot","list","item",item,this.item_header,this.item_footer);
      }
      else 
      {
        this.current_item = "";
        this.addChat("bot","text","Maaf, barang yang Anda cari tidak ditemukan.","","","");
      }
    }
    
    /* ------ Cart ------ */
    
    else if(match_keranjang != null)
    {
      // Stack
      this.setStack("keranjang");

      // Push chatbox
      this.addChat("bot","list","cart","",this.cart_header,"\n<b>Total : Rp " + this.encodePrice(this.getTotalPrice()) + "</b>\n" + this.cart_footer);
    }

    /* ------ Payment ------ */

    else if(match_bayar != null)
    {
      // Stack
      this.setStack("bayar");

      // If user has any item, address, and payment method
      if(this.cart.length && this.address.length && this.method.length) this.selectAddress();
      else
      {
        if(!this.cart.length) this.addChat("bot","text","Anda belum memilih barang.","","","");
        else if(!this.address.length) this.addChat("bot","text","Anda belum memiliki alamat pengiriman.","","","");
        else this.addChat("bot","text","Anda belum memiliki metode pembayaran.","","","");
      }
    }

    /* ------ Add ------ */

    else if(match_tambah != null)
    {
      // Response categorization based on context

      /* --- Address --- */
      if(this.prevStack("alamat")) this.addAddress();
      
      /* --- Method --- */
      
      else if(this.prevStack("metode"))
      {
        // Check if user has all payment methods
        if(this.method.length != 2) this.addMethod();
        else this.addChat("bot","text","Semua metode pembayaran sudah terdaftar.","","","");
      }
      
      /* --- Search --- */
      
      else if(this.prevStack("cari"))
      {
        // Get items that user haven't selected and matches keyword
        if(this.getAvailableItem(this.current_item).length) this.addItem(this.current_item);
        else this.addChat("bot","text","Semua barang sudah dimasukkan ke keranjang.","","","");
      }
      
      /* --- No valid previous command --- */
      
      else this.addChat("bot","text","Tidak ada data yang dapat ditambahkan.","","","");
    }
    
    /* --- Delete --- */
    
    else if(match_hapus != null)
    {
      // Response categorization based on context

      /* --- Address --- */

      if(this.prevStack("alamat"))
      {
        // Check if user has any address
        if(this.address.length) this.removeAddress();
        else this.addChat("bot","text","Tidak ada alamat kirim yang terdaftar.","","","");
      }

      /* --- Method --- */
      
      else if(this.prevStack("metode"))
      {
        // If user has any payment method
        if(this.method.length)  this.removeMethod();
        else this.addChat("bot","text","Tidak ada metode pembayaran yang terdaftar.","","","");
      }
      
      /* --- Search or cart --- */
      
      else if(this.prevStack("cari") || this.prevStack("keranjang"))
      {
        // Check if user has selected any item
        if(this.cart.length) this.removeItem();
        else this.addChat("bot","text","Tidak ada barang dalam keranjang.","","","");
      }
      
      /* --- No valid previous command --- */
      
      else this.addChat("bot","text","Tidak ada data yang dapat dihapus.","","","");
    }
    
    /* --- Invalid command --- */
    
    else this.addChat("bot","text",this.error,"","","");
  }

  
  /* ---------------------------------- Alerts ---------------------------------- */



  /* --------------------- Address --------------------- */ 


  /* --- Validate new address --- */

  newValidAddress(new_address: string)
  {
    return !(this.address.indexOf(new_address) > -1);
  }


  /* --- Add new address --- */

  addAddress()
  {
     /* -- Alert if no address selected -- */

     let required = this.alertCtrl.create(
      {
        title: 'Tambah Alamat Pengiriman',
        subTitle : 'Alamat yang kamu masukkan tidak bisa kosong.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Alert if address is already listed -- */

    let invalid = this.alertCtrl.create(
      {
        title: 'Tambah Alamat Pengiriman',
        subTitle : 'Alamat yang kamu masukkan sudah terdaftar.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- On success -- */
    
    let success = this.alertCtrl.create(
      {
        title: 'Tambah Alamat Pengiriman',
        subTitle : 'Alamat pengiriman berhasil ditambahkan!',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Prompt for address selection -- */

    let alert = this.alertCtrl.create(
      {
        title: 'Tambah Alamat Pengiriman',
        subTitle: 'Masukkan alamat pengiriman yang ingin kamu tambah.',
        inputs: [
          {
            name: 'address',
            placeholder: 'Alamat kirim baru'
          }
        ],
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Tambah',
            handler: data => {
              
              // Check if input is empty string
              if(data.address == "") required.present();
              else
              {
                // Check if new address is valid
                if(this.newValidAddress(data.address))
                { 
                  // Add new address
                  this.address.push(data.address);
                  success.present();
                } 
                else invalid.present();
              }
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }


  /* --- Get all address --- */

  getAddress(style: string)
  {
    let all: any[] = [];
    let length = this.address.length;

    for(let cnt=0; cnt<length; cnt++)
    {
      all.push(
        { 
          type: style,
          value: cnt,
          label: this.address[cnt]
        }
      );
    }
    
    return all;
  }


  /* --- Delete address --- */

  removeAddress()
  {
     /* -- Alert if no address selected -- */

     let required = this.alertCtrl.create(
      {
        title: 'Hapus Alamat Pengiriman',
        subTitle : 'Tidak ada alamat pengiriman yang kamu pilih.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- On success -- */
    
    let success = this.alertCtrl.create(
      {
        title: 'Hapus Alamat Pengiriman',
        subTitle : 'Alamat pengiriman berhasil dihapus!',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Prompt for address selection -- */

    let alert = this.alertCtrl.create(
      {
        title: 'Hapus Alamat Pengiriman',
        subTitle: 'Pilih alamat pengiriman yang ingin kamu hapus.',
        inputs: this.getAddress('checkbox'),
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Hapus',
            handler: data => {

              // Delete address from array
              for(let index of data) delete this.address[index];
              this.address = this.address.filter(x => true);
            
              // Check if user selected any address
              if(data.length) success.present();
              else required.present();
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }

  
  /* --------------------- Method --------------------- */

  
  /* --- Get all methods user haven't selected --- */

  getAvailableMethod()
  {
    let all: any[] = ['Transfer', 'Kartu Kredit'];
    let missing: any[] = [];
    let length = all.length;

    for(let cnt=0; cnt<length; cnt++)
    {
      if(this.method.indexOf(all[cnt]) == -1)
      {
        missing.push(
          { 
            type: 'checkbox',
            value: all[cnt],
            label: all[cnt] 
          }
        );
      }
    }
    
    return missing;
  }


  /* --- Add new method --- */

  addMethod()
  {
     /* -- Alert if no method selected -- */

     let required = this.alertCtrl.create(
      {
        title: 'Tambah Metode Pembayaran',
        subTitle : 'Tidak ada metode pembayaran yang kamu pilih.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- On success -- */
    
    let success = this.alertCtrl.create(
      {
        title: 'Tambah Metode Pembayaran',
        subTitle : 'Metode pembayaran berhasil ditambahkan!',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Prompt for method selection -- */

    let alert = this.alertCtrl.create(
      {
        title: 'Tambah Metode Pembayaran',
        subTitle: 'Pilih metode pembayaran yang ingin kamu tambahkan.',
        inputs: this.getAvailableMethod(),
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Tambah',
            handler: data => {
            
              // Add new payment method
              for(let option of data) this.method.push(option);

              // Check if user selected any payment method
              if(data.length) success.present();
              else required.present();
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }


  /* --- Get all method --- */

  getMethod(style: string)
  {
    let all: any[] = [];
    let length = this.method.length;

    for(let cnt=0; cnt<length; cnt++)
    {
      all.push(
        { 
          type: style,
          value: cnt,
          label: this.method[cnt]
        }
      );
    }
    
    return all;
  }


  /* --- Delete method --- */

  removeMethod() 
  {
     /* -- Alert if no method selected -- */

     let required = this.alertCtrl.create(
      {
        title: 'Hapus Metode Pembayaran',
        subTitle : 'Tidak ada metode pembayaran yang kamu pilih.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- On success -- */
    
    let success = this.alertCtrl.create(
      {
        title: 'Hapus Metode Pembayaran',
        subTitle : 'Metode pembayaran berhasil dihapus!',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Prompt for method selection -- */

    let alert = this.alertCtrl.create(
      {
        title: 'Hapus Metode Pembayaran',
        subTitle: 'Pilih metode pembayaran yang ingin kamu hapus.',
        inputs: this.getMethod('checkbox'),
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Hapus',
            handler: data => {

              // Delete method from array
              for(let index of data) delete this.method[index];
              this.method = this.method.filter(x => true);
            
              // Check if user selected any method
              if(data.length) success.present();
              else required.present();
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }


  /* --------------------- Cart and Item --------------------- */


  /* --- Get total price --- */

  getTotalPrice(): number
  {
    let total: number = 0;
    let length = this.cart_detail.length;

    for(let idx=0; idx<length; idx++) total += this.cart_detail[idx]['price'];

    return total;
  }


  /* --- Encode price to Rp standard form --- */

  public encodePrice(price: number)
  {
    let price_string: string = price.toString();
    let result = "";
    
    let length = price_string.length;
    let modulo = length % 3;

    for(let idx=0; idx<length; idx++)
    {
      if(idx % 3 == modulo && idx != 0) result += ".";
      result += price_string[idx];
    }
    
    return result;
  }


  /* --- Get all item matches specified keyword --- */

  getAllItem(key: string)
  {
    return this.item.filter(x => x['keyword'] == key);
  }


  /* --- Get item detail by id --- */

  getDetailById(id: number)
  {
    return this.item.filter(x => x['id'] == id)[0];
  }


  /* --- Get all item that matches specified keyword but user haven't selected --- */

  getAvailableItem(key: string)
  {
    let all: any[] = this.item.filter(x => x['keyword'] == key);
    let missing: any[] = [];
    let length = all.length;

    for(let cnt=0; cnt<length; cnt++)
    {
      if(this.cart.indexOf(all[cnt]['id']) == -1) {
        missing.push(
          { 
            type: 'checkbox',
            value: all[cnt]['id'],
            label: all[cnt]['brand'] + ", Rp " + this.encodePrice(all[cnt]['price'])
          }
        );
      }
    }
    
    return missing;
  }


  /* --- Get all item user have selected --- */

  getSelectedItem()
  {
    let all: any[] = [];
    let length = this.cart.length;

    for(let cnt=0; cnt<length; cnt++)
    {
      let detail = this.getDetailById(this.cart[cnt]);

      all.push(
        { 
          type: 'checkbox',
          value: cnt,
          label: detail['brand'] + ", Rp " + this.encodePrice(detail['price'])
        }
      );
    }
    
    return all;
  }


  /* --- Add new item to cart --- */

  addItem(key: string)
  {
    /* -- Alert if no item selected -- */

    let required = this.alertCtrl.create(
      {
        title: 'Tambah Barang',
        subTitle : 'Tidak ada barang yang kamu pilih.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- On success -- */
    
    let success = this.alertCtrl.create(
      {
        title: 'Tambah Barang',
        subTitle : 'Barang berhasil ditambahkan ke keranjang!',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Prompt for item selection -- */

    let alert = this.alertCtrl.create(
      {
        title: 'Tambah Barang',
        subTitle: 'Pilih barang yang akan kamu tambahkan ke keranjang.',
        inputs: this.getAvailableItem(key),
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Tambah',
            handler: data => {
            
              // Add item to cart and cart detail
              for(let option of data)
              {
                this.cart.push(option);
                this.cart_detail.push(this.getDetailById(option));
              }

              // Check if user selected any item
              if(data.length) success.present();
              else required.present();
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }


  /* --- Delete item from cart --- */

  removeItem()
  {
    /* -- Alert if no item selected -- */

    let required = this.alertCtrl.create(
      {
        title: 'Hapus Barang',
        subTitle : 'Tidak ada barang yang kamu pilih.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- On success -- */
    
    let success = this.alertCtrl.create(
      {
        title: 'Hapus Barang',
        subTitle : 'Barang berhasil dihapus!',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Prompt for item selection -- */

    let alert = this.alertCtrl.create(
      {
        title: 'Hapus Barang',
        subTitle: 'Pilih barang yang akan kamu hapus dari keranjang.',
        inputs: this.getSelectedItem(),
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Hapus',
            handler: data => {

              // Delete item from cart
              for(let index of data)
              {
                delete this.cart[index];
                delete this.cart_detail[index];
              }

              this.cart = this.cart.filter(x => true);
              this.cart_detail = this.cart_detail.filter(x => true);
            
              // Check if user selected any item
              if(data.length) success.present();
              else required.present();
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }


  /* --------------------- Payment --------------------- */


  /* --- Show address selection popup --- */

  selectAddress()
  {
    /* -- Alert if no address selected -- */

    let required = this.alertCtrl.create(
      {
        title: 'Alamat Pengiriman',
        subTitle : 'Tidak ada alamat pemgiriman yang kamu pilih.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Prompt for address selection -- */

    let alert = this.alertCtrl.create(
      {
        title: 'Alamat Pengiriman',
        subTitle: 'Pilih alamat pengiriman yang kamu inginkan.',
        inputs: this.getAddress('radio'),
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Pilih',
            handler: data => {

              // Check if user selected any address
              if(data != null) this.selectPayment();
              else required.present();
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }


  /* --- Show payment method selection popup --- */

  selectPayment()
  {
    /* -- No payment method selected -- */

    let payment_required = this.alertCtrl.create(
      {
        title: 'Metode Pembayaran',
        subTitle: 'Kamu tidak memilih metode pembayaran apapun.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Transaction complete -- */

    let complete = this.alertCtrl.create(
      {
        title: 'Transaksi Selesai',
        subTitle: 'Transaksi kamu berhasil. Terima kasih telah berbelanja! :)',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Alert if account detail is not complete -- */

    let transfer_required = this.alertCtrl.create(
      {
        title: 'Transfer',
        subTitle : 'Maaf, data rekeningmu tidak lengkap.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Alert if credit cart detail is not complete -- */

    let credit_required = this.alertCtrl.create(
      {
        title: 'Kartu Kredit',
        subTitle : 'Maaf, data kartu kreditmu tidak lengkap.',
        buttons : [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      }
    );

    /* -- Prompt for account data -- */

    let transfer = this.alertCtrl.create(
      {
        title: 'Data Rekening',
        subTitle: 'Masukkan data rekeningmu disini.',
        inputs: [
          {
            name: 'rekening',
            placeholder: 'Nomor rekening'
          },
          {
            name: 'PIN',
            placeholder: 'PIN',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Bayar',
            handler: data => {

              if(data.rekening == "" || data.PIN == "") transfer_required.present();
              else complete.present();
            }
          }
        ]
      }
    );

    /* -- Prompt for credit card data -- */

    let credit = this.alertCtrl.create(
      {
        title: 'Data Kartu Kredit',
        subTitle: 'Masukkan data kartu kreditmu disini.',
        inputs: [
          {
            name: 'kredit',
            placeholder: 'Nomor kartu kredit'
          },
          {
            name: 'PIN',
            placeholder: 'PIN',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Bayar',
            handler: data => {

              if(data.kredit == "" || data.PIN == "") credit_required.present();
              else complete.present();
            }
          }
        ]
      }
    );

    /* -- Prompt for payment method selection -- */

    let alert = this.alertCtrl.create(
      {
        title: 'Metode Pembayaran',
        subTitle: 'Pilih metode pembayaran yang kamu inginkan.',
        inputs: this.getMethod('radio'),
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Pilih',
            handler: data => {
            
              // Check if user selected any payment
              if(data != null) {

                if(this.method[data] == "Kartu Kredit") credit.present();
                else transfer.present();
              }
              else payment_required.present();
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }
}
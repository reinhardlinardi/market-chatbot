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
  
  stack: string[] = []; // Command stack


  /* ------------ Array of chatboxes  ------------ */

  public chatboxes: any[] = []; // Array of chatboxes


  /* ------------ Address and Methods  ------------ */

  public address: string[] = []; // Array of address
  public method: string[] = []; // Array of payment methods
  

  /* ------------ Cart and details  ------------ */

  public cart: any[] = []; // Cart
  public cart_detail: any[] = []; // Details for items in cart


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

  greeting: string = "Halo! Selamat datang! Saya adalah chatbot yang dapat membantu kamu berbelanja. "
                      + "Ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";


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
                  //+ "<b>Alamat :</b>\nMenampilkan atau mengubah alamat kirim.\n"
                  + "<b>Alamat :</b>\nMenampilkan atau mengubah alamat kirim."
                  + "\n\n"
                  //+ "<b>Batal : </b>\nMembatalkan pilihan, kembali ke pilihan sebelumnya.\n\n"
                  + "Contoh penggunaan perintah sebagai berikut :\n\n"
                  + "<b>Cari :</b> <u>Cari</u> kamera\n"
                  + "<b>Keranjang :</b> <u>Keranjang</u>\n"
                  + "<b>Bayar :</b> <u>Bayar</u>\n"
                  + "<b>Metode :</b> <u>Metode</u>\n"
                  + "<b>Alamat :</b> <u>Alamat</u>\n";
                  //+ "<b>Batal :</b> <u>Batal</u>\n";


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
                            + "<b>Hapus :</b> <u>Hapus</u>\n";


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
                            + "<b>Hapus :</b> <u>Hapus</u>\n";


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
                        + "<b>Hapus :</b> <u>Hapus</u>\n";

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
                        + "<b>Hapus :</b> <u>Hapus</u>\n";

  error: string = "Perintah yang anda masukkan salah. "
                  + "Silahkan coba lagi atau ketik \"Bantuan\" untuk melihat perintah apa saja yang tersedia.";


  /* -------------------- Methods -------------------- */


  /* --------------- Constructor --------------- */

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController)
  {
    // Create new instance of model in Constructor
    this.command = new Command();

    // Send greeting message
    this.chatboxes.push(
      { 
        container: "chatbox-container-bot",
        type: "chatbox-bot",
        content: "text",
        data: this.greeting 
      }
    );
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
      this.chatboxes.push(
        { 
          container: "chatbox-container-user",
          type: "chatbox-user",
          content: "text",
          data: command.val
        }
      ); 

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
    let re_batal = /^\s*batal\s*$/;
    let re_tambah = /^\s*tambah\s*$/;
    let re_hapus = /^\s*hapus\s*$/;
    

    /* ------ Save regex match ------ */

    let match_bantuan = re_bantuan.exec(lower_input);
    let match_cari = re_cari.exec(lower_input);
    let match_keranjang = re_keranjang.exec(lower_input);
    let match_bayar = re_bayar.exec(lower_input);
    let match_metode = re_metode.exec(lower_input);
    let match_alamat = re_alamat.exec(lower_input);
    let match_batal = re_batal.exec(lower_input);
    let match_tambah = re_tambah.exec(lower_input);
    let match_hapus = re_hapus.exec(lower_input);


    /* ------------ Response Categorization  ------------ */


    /* ------ Cancel ------ */
    if(match_batal != null)
    {
      //this.stack = [];
      // set match_something = true
    }

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
      this.stack = [];
      this.stack.push("alamat");
      
      // Push chatbox
      this.chatboxes.push(
        { 
          container: "chatbox-container-bot",
          type: "chatbox-bot", 
          content: "list",
          header: this.address_header,
          footer: this.address_footer,
          data: "address"
        }
      );
    }
    /* ------ Method ------ */
    else if(match_metode != null)
    { 
      // Stack
      this.stack = [];
      this.stack.push("metode");

      // Push chatbox
      this.chatboxes.push(
        { 
          container: "chatbox-container-bot",
          type: "chatbox-bot", 
          content: "list",
          header: this.method_header,
          footer: this.method_footer,
          data: "method"
        }
      );
    }
    /* ------ Search ------ */
    else if(match_cari != null)
    {
      // Stack
      this.stack = [];
      this.stack.push("cari");

      // Get keyword
      let item:string = match_cari[1].toLowerCase();
      this.all_item = this.getAllItem(item);

      // Check if keyword matches any item
      if(this.all_item.length)
      { 
        this.current_item = item;
        
        this.chatboxes.push(
          {
            container: "chatbox-container-bot",
            type: "chatbox-bot", 
            content: "list",
            header: this.item_header,
            footer: this.item_footer,
            data: "item",
            key: item
          }
        );
      }
      else 
      {
        this.current_item = "";

        this.chatboxes.push(
          {
            container: "chatbox-container-bot",
            type: "chatbox-bot", 
            content: "text",
            data: "Maaf, barang yang Anda cari tidak ditemukan."
          }
        );
      }
    }
    /* ------ Cart ------ */
    else if(match_keranjang != null)
    {
      this.stack = [];
      this.stack.push("keranjang");

      // Get item details
      this.cart_detail = [];
      for(let id of this.cart) this.cart_detail.push(this.getDetailById(id));

      // Push chatbox
      this.chatboxes.push(
        {
          container: "chatbox-container-bot",
          type: "chatbox-bot", 
          content: "list",
          header: this.cart_header,
          footer: this.cart_footer,
          data: "cart"
        }
      );
    }
    /* ------ Add ------ */
    else if(match_tambah != null)
    {
      // Get previous command
      let prev_command: string = this.stack[this.stack.length - 1];


      // Response categorization based on context

      /* --- Address --- */
      if(prev_command == "alamat") {
        this.addAddress();
      }
      /* --- Method --- */
      else if(prev_command == "metode")
      {
        // Check if user has all payment methods
        if(this.method.length != 2) {
          this.addMethod();
        }
        else 
        {
          // Push chatbox
          this.chatboxes.push(
            { 
              container: "chatbox-container-bot",
              type: "chatbox-bot", 
              content: "text",
              data: "Semua metode pembayaran sudah terdaftar."
            }
          );
        }
      }
      /* --- Search --- */
      else if(prev_command == "cari")
      {
        // Get items that user haven't selected and matches keyword
        if(this.getAvailableItem(this.current_item).length) {
          this.addItem(this.current_item);
        }
        else this.chatboxes.push(
          { 
            container: "chatbox-container-bot",
            type: "chatbox-bot", 
            content: "text",
            data: "Semua barang sudah dimasukkan ke keranjang." 
          }
        );
      }
      /* --- No valid previous command --- */
      else this.chatboxes.push(
        { 
          container: "chatbox-container-bot",
          type: "chatbox-bot", 
          content: "text",
          data: "Tidak ada data yang dapat ditambahkan." 
        }
      );
    }
    /* --- Delete --- */
    else if(match_hapus != null)
    {
      // Get previous command
      let prev_command: string = this.stack[this.stack.length - 1];
      

      // Response categorization based on context

      /* --- Address --- */
      if(prev_command == "alamat")
      {
        // Check if user has any address
        if(this.address.length) {
          this.removeAddress();
        }
        else this.chatboxes.push(
          { 
            container: "chatbox-container-bot",
            type: "chatbox-bot", 
            content: "text",
            data: "Tidak ada alamat kirim yang terdaftar." 
          }
        );
      }
      /* --- Method --- */
      else if(prev_command == "metode")
      {
        // If user has any payment method
        if(this.method.length) {
          this.removeMethod();
        }
        else this.chatboxes.push(
          { 
            container: "chatbox-container-bot",
            type: "chatbox-bot",
            content: "text",
            data: "Tidak ada metode pembayaran yang terdaftar." 
          }
        );
      }
      /* --- Search or cart --- */
      else if(prev_command == "cari" || prev_command == "keranjang")
      {
        // Check if user has selected any item
        if(this.cart.length) {
          this.removeItem();
        }
        else this.chatboxes.push(
          { 
            container: "chatbox-container-bot",
            type: "chatbox-bot", 
            content: "text",
            data: "Tidak ada barang dalam keranjang."
          }
        );
      }
      /* --- No valid previous command --- */
      else this.chatboxes.push(
        { 
          container: "chatbox-container-bot",
          type: "chatbox-bot", 
          content: "text",
          data: "Tidak ada data yang dapat dihapus." 
        }
      );
    }
    /* --- Invalid command --- */
    else this.chatboxes.push(
      { 
        container: "chatbox-container-bot",
        type: "chatbox-bot", 
        content: "text",
        data: this.error 
      }
    );
  }

  
  /* --------------- Alerts --------------- */



  /* ------------ Address  ------------ */ 


  /* --- Validate new address --- */

  newValidAddress(new_address: string)
  {
    return !(this.address.indexOf(new_address) > -1);
  }


  /* --- Add new address --- */

  addAddress()
  {
    let alert = this.alertCtrl.create(
      {
        title: 'Tambah Alamat Kirim',
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
              if(data.address == "")
              {
                // Push chatbox
                this.chatboxes.push(
                  { 
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Alamat kosong."
                  }
                );
              }
              else
              {
                // Check if new address is valid
                if(this.newValidAddress(data.address))
                { 
                  // Add new address
                  this.address.push(data.address);

                  // Push chatbox
                  this.chatboxes.push(
                    { 
                      container: "chatbox-container-bot",
                      type: "chatbox-bot", 
                      content: "text",
                      data: "Alamat berhasil ditambahkan."
                    }
                  );
                } 
                else
                {
                  // Push chatbox
                  this.chatboxes.push(
                    {
                      container: "chatbox-container-bot",
                      type: "chatbox-bot", 
                      content: "text",
                      data: "Alamat sudah terdaftar." 
                    }
                  );
                }
              }

              // Recalculate content dimensions
              this.content.resize();

              // Scroll to user's latest chat if content has a scroll
              if(this.content.scrollHeight > this.content.contentHeight) {
                this.content.scrollTo(0, this.content.scrollHeight);
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
    let alert = this.alertCtrl.create(
      {
        title: 'Hapus Alamat Kirim',
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
              if(data.length) {
                // Push chatbox
                this.chatboxes.push(
                  {
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Alamat berhasil dihapus." 
                  }
                );
              }
              else {
                // Push chatbox
                this.chatboxes.push(
                  { 
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Tidak ada alamat yang dipilih." 
                  }
                );
              }

              // Recalculate content dimensions
              this.content.resize();

              // Scroll to user's latest chat if content has a scroll
              if(this.content.scrollHeight > this.content.contentHeight) {
                this.content.scrollTo(0, this.content.scrollHeight);
              }
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }

  
  /* ------------ Method  ------------ */ 

  
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
    let alert = this.alertCtrl.create(
      {
        title: 'Tambah Metode Pembayaran',
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
              if(data.length)
              {
                // Push chatbox
                this.chatboxes.push(
                  { 
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Metode pembayaran berhasil ditambahkan."
                  }
                );
              }
              else
              {
                // Push chatbox
                this.chatboxes.push(
                  {
                    conntainer: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Tidak ada metode pembayaran yang dipilih." 
                  }
                );
              }

              // Recalculate content dimensions
              this.content.resize();

              // Scroll to user's latest chat if content has a scroll
              if(this.content.scrollHeight > this.content.contentHeight) {
                this.content.scrollTo(0, this.content.scrollHeight);
              }
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
    let alert = this.alertCtrl.create(
      {
        title: 'Hapus Metode Pembayaran',
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
              if(data.length) {
                // Push chatbox
                this.chatboxes.push(
                  {
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Metode pembayaran berhasil dihapus." 
                  }
                );
              }
              else {
                // Push chatbox
                this.chatboxes.push(
                  {
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Tidak ada metode pembayaran yang dipilih." 
                  }
                );
              }

              // Recalculate content dimensions
              this.content.resize();

              // Scroll to user's latest chat if content has a scroll
              if(this.content.scrollHeight > this.content.contentHeight) {
                this.content.scrollTo(0, this.content.scrollHeight);
              }
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }


  /* ------------ Cart and Item  ------------ */ 


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
    let alert = this.alertCtrl.create(
      {
        title: 'Tambah Ke Keranjang',
        inputs: this.getAvailableItem(key),
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          },
          {
            text: 'Tambah',
            handler: data => {
            
              // Add item to cart
              for(let option of data) this.cart.push(option);

              // Check if user selected any item
              if(data.length) {
                // Push chatbox
                this.chatboxes.push(
                  {
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Barang berhasil ditambahkan ke keranjang."
                  }
                );
              }
              else
              {
                // Push chatbox
                this.chatboxes.push(
                  { 
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Tidak ada barang yang dipilih."
                  }
                );
              }

              // Recalculate content dimensions
              this.content.resize();
            
              // Scroll to user's latest chat if content has a scroll
              if(this.content.scrollHeight > this.content.contentHeight) {
                this.content.scrollTo(0, this.content.scrollHeight);
              }
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
    let alert = this.alertCtrl.create(
      {
        title: 'Hapus Barang Dari Keranjang',
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
              for(let index of data) delete this.cart[index];
              this.cart = this.cart.filter(x => true);
            
              // Check if user selected any item
              if(data.length) {
                // Push chatbox
                this.chatboxes.push(
                  {
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Barang berhasil dihapus dari keranjang."
                  }
                );
              }
              else {
                // Push chatbox
                this.chatboxes.push(
                  {
                    container: "chatbox-container-bot",
                    type: "chatbox-bot", 
                    content: "text",
                    data: "Tidak ada barang yang dipilih."
                  }
                );
              }

              // Recalculate content dimensions
              this.content.resize();

              // Scroll to user's latest chat if content has a scroll
              if(this.content.scrollHeight > this.content.contentHeight) {
                this.content.scrollTo(0, this.content.scrollHeight);
              }
            }
          }
        ]
      }
    );

    // Show alert
    alert.present();
  }
}
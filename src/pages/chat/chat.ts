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
      price: 3000000,
      img: 'assets/imgs/s4.png'
    },
    {
      id: 2,
      keyword: 'kamera',
      name: 'Kamera',
      brand: 'Sony',
      price: 2000000
    },
    {
      id: 3,
      keyword: 'hp',
      name: 'Handphone',
      brand: 'Samsung',
      price: 5000000
    }
  ];

  /* ------------ Recommendation  ------------ */

  camera_search: boolean = true;

  /* -------------------- Constants -------------------- */

  /* ------------ Greeting  ------------ */

  greetings: string[] = [
    "Halo! Selamat datang!",
    "Aku adalah chatbot yang akan membantu kamu berbelanja."
    + "\n\n"
    + "Jika kamu memerlukan bantuan, ketik \"Bantuan\""
  ];


  /* ------------ Help  ------------ */

  helps: string[] = [
    "<b>Bantuan</b>"
    + "\n\n"
    + "<i>Cari</i>\n"
    + "Mencari barang berdasarkan nama barang."
    + "\n\n"
    + "<i>Keranjang</i>\n"
    + "Menampilkan semua barang yang ada di keranjang."
    + "\n\n"
    + "<i>Bayar</i>\n"
    + "Melanjutkan ke tahap pembayaran."
    + "\n\n"
    + "<i>Metode</i>\n"
    + "Menampilkan atau mengubah metode pembayaran."
    + "\n\n"
    + "<i>Alamat</i>\n"
    + "Menampilkan atau mengubah alamat pengiriman."
    + "\n\n"
    + "<i>Lacak</i>\n"
    + "Melacak status barang yang sedang dikirim",
    "Untuk menggunakan perintah-perintah di atas, kamu dapat mengirimkan chat seperti ini :"
    + "\n\n"
    + "• Aku mau <u>cari</u> <u>kamera</u>\n"
    + "• Tampilin <u>keranjang</u> donk.\n"
    + "• Yah, <u>bayar</u> :(\n"
    + "• Bayar bisa pake <u>metode</u> apa?\n"
    + "• <u>Alamat</u> ku ada apa aja ya..."
  ];


  /* ------------ Address  ------------ */

  addr: string[] = [
    "<b>Alamat Pengiriman</b>"
    + "\n\n"
    + "Daftar alamat pengiriman yang kamu punya :"
    + "\n\n",
    "Kamu dapat menambah atau menghapus alamat pengiriman dengan perintah-perintah di bawah ini."
    + "\n\n"
    + "<i>Tambah</i>\n"
    + "Menambahkan alamat pengiriman baru. "
    + "Jika alamat sudah terdaftar, alamat tidak akan ditambahkan."
    + "\n\n"
    + "<i>Hapus</i>\n"
    + "Menghapus alamat pengiriman.",
    "Contoh penggunaannya :"
    + "\n\n"
    + "• Harus <u>tambah</u> alamat baru nih. Hmmm\n"
    + "• Mau <u>hapus</u> alamat ah.."
  ];


  /* ------------ Method  ------------ */

  methods: string[] = [
    "<b>Metode Pembayaran</b>"
    + "\n\n"
    + "Daftar metode pembayaran yang kamu punya :"
    + "\n\n",
    "Kamu dapat menambah atau menghapus metode pembayaran dengan perintah-perintah di bawah ini."
    + "metode pembayaran."
    + "\n\n"
    + "<i>Tambah</i>\n"
    + "Menambahkan metode pembayaran baru."
    + "\n\n"
    + "<i>Hapus</i>\n"
    + "Menghapus metode pembayaran.",
    "Contoh penggunaannya :"
    + "\n\n"
    + "• Mau <u>tambah</u> cara bayar dong\n"
    + "• Bisa <u>hapus</u> metode pembayaran?"
  ];


  /* ------------ Item  ------------ */

  items: string[] = [
    "<b>Hasil Pencarian</b>"
    + "\n\n"
    + "Hasil pencarian :"
    + "\n",
    "Kamu dapat menggunakan perintah di bawah ini untuk menambah atau menghapus barang pada keranjang."
    + "\n\n"
    + "<i>Tambah</i>\n"
    + "Menambahkan barang ke keranjang."
    + "\n\n"
    + "<i>Hapus</i>\n"
    + "Menghapus barang dari keranjang.",
    "Contoh penggunaannya :"
    + "\n\n"
    + "• Mau <u>tambah</u> dong. Hehehe\n"
    + "• Mahal juga :( <u>hapus</u> deh"
  ];

  /* ------------ Cart  ------------ */

  carts: string[] = [
    "<b>Keranjang</b>"
    + "\n\n"
    + "Barang pada keranjangmu :"
    + "\n",
    "Kamu dapat menggunakan perintah di bawah ini untuk menghapus barang dari keranjang."
    + "\n\n"
    + "<i>Hapus</i>\n"
    + "Menghapus barang dari keranjang."
    + "\n\n"
    + "<i>Kosong</i>\n"
    + "Mengosongkan keranjang.",
    "Contoh penggunaannya :"
    + "\n\n"
    + "• Gw <u>hapus</u> dulu deh. Kurang menarik barangnya\n"
    + "• Kayanya sementara keranjang harus <u>kosong</u>, soalnya dompet juga sama haha"
  ];

  /* ------------ Error  ------------ */

  error: string = "Maaf, aku tidak mengerti apa yang kamu maksud. Jika kamu memerlukan bantuan, ketik \"Bantuan\"";


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

    let re_tambah = /^(?:.*\s+)*tambah[,\.?!]?(?:\s+.*)*$/;
    let re_hapus = /^(?:.*\s+)*hapus[,\.?!]?(?:\s+.*)*$/;
    let re_bantuan = /^(?:.*\s+)*bantuan[,\.?!]?(?:\s+.*)*$/;
    let re_cari = /^(?:.*\s+)*cari\s+([^\s]+)[,\.?!]?(?:\s+.*)*$/;
    let re_keranjang = /^(?:.*\s+)*keranjang[,\.?!]?(?:\s+.*)*$/;
    let re_bayar = /^(?:.*\s+)*bayar[,\.?!]?(?:\s+.*)*$/;
    let re_metode = /^(?:.*\s+)*metode[,\.?!]?(?:\s+.*)*$/;
    let re_alamat = /^(?:.*\s+)*alamat[,\.?!]?(?:\s+.*)*$/;
    let re_kosong = /^(?:.*\s+)*kosong[,\.?!]?(?:\s+.*)*$/;
    let re_lacak = /^(?:.*\s+)*lacak[,\.?!]?(?:\s+.*)*$/;
    

    /* ------ Save regex match ------ */

    let match_tambah = re_tambah.exec(lower_input);
    let match_hapus = re_hapus.exec(lower_input);
    let match_bantuan = re_bantuan.exec(lower_input);
    let match_cari = re_cari.exec(lower_input);
    let match_keranjang = re_keranjang.exec(lower_input);
    let match_bayar = re_bayar.exec(lower_input);
    let match_metode = re_metode.exec(lower_input);
    let match_alamat = re_alamat.exec(lower_input);
    let match_kosong = re_kosong.exec(lower_input);
    let match_lacak = re_lacak.exec(lower_input);


    /* ------------ Response Categorization  ------------ */

    /* ------ Add ------ */

    if(match_tambah != null)
    {
      // Response categorization based on context

      /* --- Address --- */
      if(this.prevStack("alamat")) this.addAddress();
      
      /* --- Method --- */
      
      else if(this.prevStack("metode"))
      {
        // Check if user has all payment methods
        if(this.method.length != 2) this.addMethod();
        else {
          let msg : string = "Kamu sudah memiliki semua metode pembayaran! Keren";
          this.addChat("bot","text",msg,"","","");
        }
      }
      
      /* --- Search --- */
      
      else if(this.prevStack("cari"))
      {
        // Get items that user haven't selected and matches keyword
        if(this.getAvailableItem(this.current_item).length) {
          this.addItem(this.current_item);
        }
        else {
          let msg : string = "Semua barang dengan kategori " + this.current_item + " sudah kamu masukkan ke keranjang! Yeay";
          this.addChat("bot","text",msg,"","","");
        }
      }
      
      /* --- No valid previous command --- */
      
      else {
        let msg : string = "Maaf, aku tidak mengerti data apa yang mau kamu tambahkan";
        this.addChat("bot","text",msg,"","","");
      }
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
        else {
          let msg : string = "Maaf, kamu tidak memiliki alamat pengiriman yang terdaftar";
          this.addChat("bot","text",msg,"","","");
        }
      }

      /* --- Method --- */
      
      else if(this.prevStack("metode"))
      {
        // If user has any payment method
        if(this.method.length)  this.removeMethod();
        else {
          let msg : string = "Maaf, kamu tidak memiliki metode pembayaran";
          this.addChat("bot","text",msg,"","","");
        }
      }
      
      /* --- Search or cart --- */
      
      else if(this.prevStack("cari") || this.prevStack("keranjang"))
      {
        // Check if user has selected any item
        if(this.cart.length) this.removeItem();
        else {
          let msg : string = "Maaf, kamu tidak memiliki barang apapun di keranjang";
          this.addChat("bot","text",msg,"","","");
        }
      }
      
      /* --- No valid previous command --- */
      
      else {
        let msg : string = "Maaf, aku tidak mengerti data apa yang mau kamu hapus";
        this.addChat("bot","text",msg,"","","");
      }
    }

    /* ------ Help ------ */

    else if(match_bantuan != null)
    {
      for(let help of this.helps) this.addChat("bot","text",help,"","","");
    }

    /* ------ Address ------ */ 

    else if(match_alamat != null)
    {
      // Stack 
      this.setStack("alamat");
      
      // Push chatbox
      this.addChat("bot","list","address","",this.addr[0],"");
      let length = this.addr.length;

      for(let idx=1; idx<length; idx++) this.addChat("bot","text",this.addr[idx],"","","");
    }
    
    /* ------ Method ------ */
    
    else if(match_metode != null)
    { 
      // Stack
      this.setStack("metode");

      // Push chatbox
      this.addChat("bot","list","method","",this.methods[0],"");
      let length = this.methods.length;
      
      for(let idx=1; idx<length; idx++) this.addChat("bot","text",this.methods[idx],"","","");
    }
    
    /* ------ Search ------ */
    
    else if(match_cari != null)
    {
      // Stack
      this.setStack("cari");

      // Get keyword
      let item: string = match_cari[1].toLowerCase();
      this.all_item = this.getAllItem(item);

      // Check if keyword matches any item
      if(this.all_item.length)
      { 
        this.current_item = item;
        this.addChat("bot","list","item",item,this.items[0],"");
        let length = this.items.length;
        
        for(let idx=1; idx<length; idx++) this.addChat("bot","text",this.items[idx],"","","");
      }
      else 
      {
        this.current_item = "";
        
        let msg : string = "Maaf, aku tidak dapat menemukan barang yang kamu cari"
        this.addChat("bot","text",msg,"","","");
      }
    }
    
    /* ------ Cart ------ */
    
    else if(match_keranjang != null)
    {
      // Stack
      this.setStack("keranjang");

      // Push chatbox
      this.addChat("bot","list","cart","",this.carts[0],"");
      let length = this.carts.length;
      
      for(let idx=1; idx<length; idx++) this.addChat("bot","text",this.carts[idx],"","","");
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
        let msg = "";

        if(!this.cart.length) msg = "Kamu belum memilih barang apapun.\n\nKamu dapat menambahkan barang pada menu \"cari\"";
        else if(!this.address.length) msg = "Kamu belum memiliki alamat pengiriman.\n\nKamu dapat menambahkan alamat pengiriman pada menu \"alamat\"";
        else msg = "Kamu belum memiliki metode pembayaran.\n\nKamu dapat menambahkan metode pembayaran pada menu \"metode\"";

        this.addChat("bot","text",msg,"","","");
      }
    }

    /* ------ Empty cart ------ */
    else if(match_kosong != null)
    {
      if(this.prevStack("keranjang"))
      {
        while(this.cart.length)
        {
          this.cart.pop();
          this.cart_detail.pop();
        }

        let msg : string = "Keranjang berhasil dikosongkan!";
        this.addChat("bot","text",msg,"","","");
      }
      else
      {
        let msg : string = "Maaf, kamu harus masuk ke menu keranjang untuk mengosongkan keranjang";
        this.addChat("bot","text",msg,"","","");
      }
    }

    /* ------ Tracking ------ */

    else if(match_lacak != null)
    {
      this.addChat("bot","text","<b>Hasil Pelacakan</b>\n\nBarang yang kamu pesan memiliki status <u>PAID</u>.\n\nDalam waktu 3 hari, paket kamu akan sampai :D","","","");
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

  public getTotalPrice(): number
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
            role: 'cancel',
            handler: () => {
              if(this.current_item == 'kamera' && this.camera_search)
              {
                this.camera_search = false;
    
                this.chatboxes.push(
                  {
                    container: "chatbox-container-bot",
                    type: "chatbox-bot",
                    content: "text",
                    data: "<b>Rekomendasi</b>\n\nDapatkan HP Samsung terbaru kami dengan harga spesial!\n\nGunakan keyword <u>HP</u> pada menu pencarian :)"
                  }
                );

                if(this.content.scrollHeight > this.content.contentHeight) {
                  this.content.scrollTo(0, this.content.scrollHeight);
                }
              }
            }
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
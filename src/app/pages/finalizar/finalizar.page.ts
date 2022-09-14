import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
})
export class FinalizarPage implements OnInit {

  productos: producto[] = [];
  constructor( private iab: InAppBrowser,
    private dataLocal: DataLocalService,
    private alertCtrl:AlertController,
    private modalCtrl:ModalController,
    private navCtrl:NavController) { }
  numero = '593999987837';
  
  //
nombre='';
mesa='';
comentario='';
FormaPago='Efectivo';
total=0;
strinProductos ='';
  ngOnInit() {
    this.cargarProductos();
  }
  async cargarProductos() {
    this.productos = await this.dataLocal.getProductos();
   
    let cont=1;
    this.productos.forEach(producto=> {
      this.strinProductos+= `    *N`+cont+`*: `     + producto.nombre  ;
      this.strinProductos+= `   *Precio*: $` + producto.precio ;
      this.strinProductos+= `    *Cantidad*: ` + producto.cantidad  ;
      this.strinProductos+= `    *Total Artículo*: $` + producto.total + `\n`;
      this.total += producto.total;
      cont++;
    })
  var a =` ss`

    this.strinProductos +='    *Total Compra*: $' + Number((this.total).toFixed(2));
  }
async enviar(){
  if(this.nombre !== ' ' && this.mesa!=='' && this.FormaPago!=='' ){
  let texto = '*Cliente*: ' +this.nombre + `\n`;
  texto += '     *Tipo de pago*:' + this.FormaPago + `\n`;
  texto += '    *Comentario*: ' + this.comentario + `\n`;
  texto += '    *Artículos* ' + `\n`;
  texto+=this.strinProductos;
  let url = 'https://wa.me/' + this.numero + '?text=' + texto;
  const browser = this.iab.create(url,'_system');
  this.dataLocal.setear();
  this.navCtrl.navigateForward('/')
}else{
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Alerta',
    message: 'Llenar todos los campos',
    buttons: ['Aceptar']
  });

  await alert.present();
}
}


}

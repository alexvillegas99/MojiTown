import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.page.html',
  styleUrls: ['./modal-producto.page.scss'],
})
export class ModalProductoPage implements OnInit {

  @Input() producto: producto;

  total=0;
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private toas:ToastController) { }
 
  ngOnInit() {
    this.producto.total = (this.producto.cantidad=0) * this.producto.precio;
  }
  calcular(signo) {
    let valor = eval( this.producto.cantidad+ signo + 1)
    if (valor === 0) {
      this.producto.cantidad = 1;
    } else {
      this.producto.cantidad = valor;
    }
    this.producto.total  =  this.producto.cantidad * this.producto.precio;
    this.producto.total=Number(this.producto.total.toFixed(2));
  }
  salir() {
    this.modalCtrl.dismiss();
  }
  async continuarCompra(producto:producto){
    if(producto.cantidad!==0){
    this.dataLocal.guardarProducto(producto);
    }
    const toast = await this.toas.create({
      message: `${producto.nombre} añadido al carrito.`,
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss(); 
    
  }

}

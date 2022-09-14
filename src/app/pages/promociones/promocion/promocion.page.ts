import { Component, OnInit, Input } from '@angular/core';
import { promociones } from '../../../interfaces/promociones';
import { ModalController, ToastController } from '@ionic/angular';
import { producto } from 'src/app/interfaces/producto';
import { DataLocalService } from '../../../services/data-local.service';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.page.html',
  styleUrls: ['./promocion.page.scss'],
})
export class PromocionPage implements OnInit {
  @Input() producto: promociones;
  productoGuardar:producto;
  constructor(private modalCtrl:ModalController,
    private toas:ToastController,
    private dataLocal: DataLocalService) { }

  ngOnInit() {
  }
  calcular(signo) {
    let valor = eval( this.producto.cantidad+ signo + 1)
    if (valor === 0) {
      this.producto.cantidad = 1;
    } else {
      this.producto.cantidad = valor;
    }
    this.producto.total  =  this.producto.cantidad * this.producto.preciop;
  }
  salir() {
    this.modalCtrl.dismiss();
  }
  async continuarCompra(prod:promociones){
    this.productoGuardar={
      nombre:prod.nombre,
      descripcion:prod.descripcion,
      imagen:prod.imagen,
      precio:prod.preciop,
      total:prod.total,
      cantidad:prod.cantidad,
      categoria:prod.categoria,
      estado:true
    }
   
    if(this.productoGuardar.cantidad!==0){
     this.dataLocal.guardarProducto(this.productoGuardar); 
    }
    const toast = await this.toas.create({
      message: `${this.productoGuardar.nombre} añadido al carrito.`,
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss(); 
    
  }
}

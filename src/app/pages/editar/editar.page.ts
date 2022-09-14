import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  @Input() producto: producto;
  constructor(private modalCtrl: ModalController,
    private dataLocal: DataLocalService) { }

cantidad=0;
total=0;
  ngOnInit() {
    this.total = this.producto.cantidad* this.producto.precio;
    this.cantidad=this.producto.cantidad;
  }
  async calcular(signo) {
    
    let valor = eval(this.cantidad + signo + 1)
    if (valor === 0) {
      this.cantidad = 1;
    } else {
      this.cantidad = valor;
    }
    this.total = this.cantidad * this.producto.precio;
  }
  salir() {
    this.modalCtrl.dismiss();
  }
  continuarCompra(producto) {
   this.dataLocal.guardarProducto(producto);
   this.producto.cantidad=this.cantidad;
   this.producto.total=this.producto.cantidad*this.producto.precio;
   this.salir();
  }

}

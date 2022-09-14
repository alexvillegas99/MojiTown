import { Component, Input, OnInit } from '@angular/core';
import { producto } from '../../interfaces/producto';
import { ModalController } from '@ionic/angular';
import { ModalProductoPage } from '../../pages/modal-producto/modal-producto.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  @Input() productos: producto[]=[];
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  async mostrarModal(producto:producto) {
    const modal = await this.modalCtrl.create({
      component: ModalProductoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'producto': producto
      }
    });
    return await modal.present();
  }
}

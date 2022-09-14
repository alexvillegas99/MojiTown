import { Component, Input, OnInit } from '@angular/core';
import { producto } from '../../interfaces/producto';
import { categoria } from '../../interfaces/categoria';
import { ModalController } from '@ionic/angular';
import { ModalProductoPage } from '../../pages/modal-producto/modal-producto.page';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {

  @Input() Productos:producto[]=[];
  @Input() Categoria:string;
  ca:string='';
    constructor(private modalCtrl:ModalController) { }
     
    ngOnInit() {
    }
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

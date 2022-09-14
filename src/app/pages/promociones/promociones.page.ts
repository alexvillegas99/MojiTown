import { Component, OnInit } from '@angular/core';
import { promociones } from '../../interfaces/promociones';
import { ModalController } from '@ionic/angular';
import { PromocionPage } from './promocion/promocion.page';
import { CrudPromocionesService } from '../../services/crud-promociones.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {

  constructor(private modalCtrl:ModalController,
    private ProductosServices:CrudPromocionesService) { }
promociones:promociones[]=[]
  ngOnInit() {
    this.ProductosServices.getProductos().subscribe(res => {
      this.promociones = res;
      this.promociones = this.promociones.filter(prod=>
        prod.estado===true
        )
    });
  }
  async mostrarModal(producto:promociones){
    const modal = await this.modalCtrl.create({
      component: PromocionPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'producto': producto
      }
    });
    return await modal.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { producto } from '../../../interfaces/producto';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { CrudProductosService } from '../../../services/crud-productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-categoria',
  templateUrl: './listado-categoria.page.html',
  styleUrls: ['./listado-categoria.page.scss'],
})
export class ListadoCategoriaPage implements OnInit {

  Productos:producto[]=[];
  categoria?:string;
  constructor(private modalCtrl:ModalController,
    private crudService:CrudProductosService,
    private ruta: ActivatedRoute,
    private navCtrl:NavController,
    private alertCtrl:AlertController,
  ) { }
  onClick(){
this.modalCtrl.dismiss();
  }
  ngOnInit() {
    this.categoria=this.ruta.snapshot.params.categoria;
    this.crudService.getProductos().subscribe(res=>{
      this.Productos = res;
    }) ;
    this.Productos.filter(elemento=>{
      elemento.categoria===this.categoria
    })
  }
  
  async editarProducto(id:string){
    this.navCtrl.navigateForward(`admin/editar-producto/${id}`);
  }
  async eliminarProducto(id:string){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: '<strong>Desea eliminar el producto ?</strong>',
      buttons: [
        {
          text: 'Cancerlar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.crudService.deleteProducto(id);
          }
        }
      ]
    });

    await alert.present();
  }
 async  actualizarStock(producto:producto){
    producto.estado=!producto.estado;
    this.crudService.updateProducto(producto,producto.id);
  }
}

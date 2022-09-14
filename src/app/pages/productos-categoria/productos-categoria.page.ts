import { Component, Input, OnInit } from '@angular/core';
import { categoria } from '../../interfaces/categoria';
import { NavController, ModalController } from '@ionic/angular';
import { CrudProductosService } from '../../services/crud-productos.service';
import { producto } from 'src/app/interfaces/producto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-categoria',
  templateUrl: './productos-categoria.page.html',
  styleUrls: ['./productos-categoria.page.scss'],
})
export class ProductosCategoriaPage implements OnInit {

  Productos:producto[]=[];
  categoria?:string;
  constructor(private modalCtrl:ModalController,
    private crudService:CrudProductosService,
    private ruta: ActivatedRoute) { }
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
  async llenar(){
  
  }

}

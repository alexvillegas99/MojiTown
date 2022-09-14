import { Component, OnInit } from '@angular/core';
import { promociones } from '../../../../interfaces/promociones';
import { CrudPromocionesService } from '../../../../services/crud-promociones.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-promocion',
  templateUrl: './agregar-promocion.page.html',
  styleUrls: ['./agregar-promocion.page.scss'],
})
export class AgregarPromocionPage implements OnInit {
  Producto:promociones={
    nombre:'',
    descripcion:'',
    imagen:'',
    precio:0,
    preciop:0,
    total:0,
    cantidad:0,
    categoria:'',
    estado:true
  }
  constructor(private ProductosService:CrudPromocionesService,
    private navCtrl:NavController) { }

  ngOnInit() {
  }
  selectedFile:any;
  chooseFile (event) {
    this.selectedFile = event.target.files[0];
    console.log('img',this.selectedFile); 
  }
  async agregar(){
  
    if(this.Producto.nombre!=='' && this.Producto.descripcion!==''
    && this.Producto.precio!=0 && this.Producto.preciop!==0&& this.chooseFile!=null ){
    this.ProductosService.addImgProducto(this.Producto,this.selectedFile);
    this.navCtrl.navigateForward('/admin/promociones')
    }
    }
}

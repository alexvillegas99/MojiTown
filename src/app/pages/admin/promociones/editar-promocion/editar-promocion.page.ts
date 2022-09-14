import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CrudCategoriasService } from '../../../../services/crud-categorias.service';
import { promociones } from '../../../../interfaces/promociones';
import { CrudPromocionesService } from '../../../../services/crud-promociones.service';

@Component({
  selector: 'app-editar-promocion',
  templateUrl: './editar-promocion.page.html',
  styleUrls: ['./editar-promocion.page.scss'],
})
export class EditarPromocionPage implements OnInit {
  Producto: promociones = {
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: 0,
    preciop: 0,
    total: 0,
    cantidad: 0,
    categoria: '',
    estado: true
  };
  selectedFile: any;
  constructor(private ruta: ActivatedRoute,
    private ProductosService: CrudPromocionesService,
    private navCtrl: NavController,
    private CategoriasService: CrudCategoriasService) { }
id='';
  ngOnInit() {
    this.id = this.ruta.snapshot.params.id;
    this.cargarProducto(this.id);
  }
  async cargarProducto(id) {
    await this.ProductosService.getProducto(id).subscribe(res => {
      this.Producto = res;
    });
  }
  chooseFile(event) {
    this.selectedFile = event.target.files[0];
  }
  async editar() {

    if (this.Producto.nombre !== ''  && this.selectedFile===undefined && this.Producto.descripcion !== ''
      && this.Producto.precio != 0 && this.Producto.preciop !== 0) {
      this.ProductosService.updateProducto(this.Producto, this.id);
      this.navCtrl.navigateForward('/admin/administracion')
    }else{
      this.ProductosService.updateImagenProducto(this.Producto, this.id,this.selectedFile);
      this.navCtrl.navigateForward('/admin/administracion')
    }
  }
}

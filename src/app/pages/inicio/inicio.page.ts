import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudProductosService } from '../../services/crud-productos.service';
import { producto } from '../../interfaces/producto';
import { CarritoPage } from '../carrito/carrito.page';
import { IonSegment, ModalController, NavController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { categoria } from '../../interfaces/categoria';
import { CrudCategoriasService } from '../../services/crud-categorias.service';
import { element } from 'protractor';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;
  tipos = ['Categorias', 'Todo'];
  cambiar = true;
  busqueda = false;
  productosFiltrados: producto[] = [];
  CategoriasSinOrden: categoria[] = [];
  Categorias: categoria[] = [];
  mensaje = '';
  constructor(private crudService: CrudProductosService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private dataLocal: DataLocalService,
    private CategoriasService: CrudCategoriasService) { }
  textoBuscar = '';
  productos: producto[] = [];
  ngOnInit() {
    this.crudService.getProductos().subscribe(res => {
      this.productos = res;
      this.productos = this.productos.filter(prod=>
      prod.estado===true
      )
    });
    this.cargarCategorias();


  }
  async cargarCategorias() {
    await this.CategoriasService.getCategorias().subscribe(res => {
     
      this.Categorias = res;
      this.Categorias.sort(function (a, b){
        return (a.orden - b.orden)
      })
    });

  }

  buscar(ev) {
    this.textoBuscar = ev.detail.value

    if (this.textoBuscar.length == 0) {
      this.busqueda = false;
    } else {
      this.busqueda = true;

    }

    this.productosFiltrados = [];
    let longitud: number = this.textoBuscar.length;
    this.productos.forEach(producto => {
      if (this.textoBuscar.toLocaleLowerCase() === producto.nombre.substring(0, longitud).toLocaleLowerCase()) {
        this.productosFiltrados.push(producto);
      }
    })

    if (this.productosFiltrados.length == 0) {
      this.mensaje = 'No se encontraron coincidencias'
    } else {
      this.mensaje = ''
    }
  }

  async carrito() {
    const modal = await this.modalCtrl.create({
      component: CarritoPage
    });

    return await modal.present();

  }
  CambioTipo(event) {
    if (event.detail.value == 'Categorias') {
      this.cambiar = true;
    } else {
      this.cambiar = false;
    }
  }

}

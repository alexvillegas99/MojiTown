import { Component, OnInit, Input } from '@angular/core';
import { producto } from 'src/app/interfaces/producto';
import { categoria } from '../../interfaces/categoria';
import { ModalController, NavController } from '@ionic/angular';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ProductosCategoriaPage } from '../../pages/productos-categoria/productos-categoria.page';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {

  @Input() Productos: producto[] = [];
  @Input() Categorias: categoria[] = [];
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  async MostrarModal(categoria: categoria) {
    this.navCtrl.navigateForward(`/productos-categoria/${categoria.nombre}`);
  }
}

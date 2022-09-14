import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosCategoriaPage } from './productos-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosCategoriaPageRoutingModule {}

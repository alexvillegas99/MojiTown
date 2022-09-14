import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromocionesPage } from './promociones.page';

const routes: Routes = [
  {
    path: '',
    component: PromocionesPage
  },
  {
    path: 'editar-promocion/:id',
    loadChildren: () => import('./editar-promocion/editar-promocion.module').then( m => m.EditarPromocionPageModule)
  },
  {
    path: 'agregar-promocion',
    loadChildren: () => import('./agregar-promocion/agregar-promocion.module').then( m => m.AgregarPromocionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromocionesPageRoutingModule {}

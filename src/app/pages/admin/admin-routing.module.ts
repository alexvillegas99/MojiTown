import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { AuthGuard } from '../../shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'administracion',
    loadChildren: () => import('./administracion/administracion.module').then( m => m.AdministracionPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'listado-categoria/:categoria',
    loadChildren: () => import('./listado-categoria/listado-categoria.module').then( m => m.ListadoCategoriaPageModule)
  },
  {
    path: 'agregar-categoria',
    loadChildren: () => import('./agregar-categoria/agregar-categoria.module').then( m => m.AgregarCategoriaPageModule)
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'editar-categoria/:id',
    loadChildren: () => import('./editar-categoria/editar-categoria.module').then( m => m.EditarCategoriaPageModule)
  },
  {
    path: 'editar-producto/:id',
    loadChildren: () => import('./editar-producto/editar-producto.module').then( m => m.EditarProductoPageModule)
  },
  {
    path: 'promociones',
    loadChildren: () => import('./promociones/promociones.module').then( m => m.PromocionesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}

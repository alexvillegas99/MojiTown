import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PipesModule } from '../pipes/pipes.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [ProductosComponent,EncabezadoComponent,CategoriasComponent,CategoriaComponent,PromocionesComponent,SpinnerComponent],
  exports: [ProductosComponent,EncabezadoComponent,CategoriasComponent,CategoriaComponent,PromocionesComponent,SpinnerComponent],
  imports: [
    CommonModule,PipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosCategoriaPageRoutingModule } from './productos-categoria-routing.module';

import { ProductosCategoriaPage } from './productos-categoria.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosCategoriaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductosCategoriaPage]
})
export class ProductosCategoriaPageModule {}

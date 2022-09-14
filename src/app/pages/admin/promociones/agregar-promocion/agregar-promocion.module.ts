import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPromocionPageRoutingModule } from './agregar-promocion-routing.module';

import { AgregarPromocionPage } from './agregar-promocion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPromocionPageRoutingModule
  ],
  declarations: [AgregarPromocionPage]
})
export class AgregarPromocionPageModule {}

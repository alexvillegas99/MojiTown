import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//

import { AngularFirestoreModule } from "@angular/fire/firestore"; //Modulo Firestore (BD)
import { AngularFireAuthModule } from "@angular/fire/auth";  //Modulo de authenticacion
import { AngularFireModule } from "@angular/fire";            //Modulo para inicializar y que todo funcione
import { AngularFireStorageModule } from "@angular/fire/storage"; //Storage
import { environment } from 'src/environments/environment';
import { ComponentsModule } from './components/components.module';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PipesModule } from './pipes/pipes.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ComponentsModule,
    PipesModule,
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [InAppBrowser,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { producto } from '../interfaces/producto';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  productos:producto[]=[];
  constructor(private store:Storage) { }
async guardarProducto(producto:producto){
  this.productos = await this.productos.filter(elemento=>
    elemento.nombre !== producto.nombre
  )
  this.productos.push(producto);
  this.store.set('productos',this.productos);
}
async setear(){
  this.productos=[];
  this.store.set('productos',this.productos);

}
async getProductos(){
  const productos = await this.store.get('productos');
  this.productos=productos ||[];
  return this.productos;
}
async delete(producto:producto){
  this.productos = await this.productos.filter(elemento=>
    elemento.nombre !== producto.nombre
  )
  this.store.set('productos',this.productos);
}
}

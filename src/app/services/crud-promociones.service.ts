import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { promociones } from '../interfaces/promociones';

@Injectable({
  providedIn: 'root'
})
export class CrudPromocionesService {

  private filePath:any;
  private ProductosCollection: AngularFirestoreCollection<promociones>;
  private Productos: Observable<promociones[]>;
  constructor(private db: AngularFirestore,
    private storage:AngularFireStorage) {

    this.ProductosCollection = db.collection<promociones>('Promociones');
    this.Productos = this.ProductosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      }
    ))

  }
  addImgProducto(producto:promociones,img:File){
    this.filePath = `Productos/${img.name}`;
    const fileRef=this.storage.ref(this.filePath);
    const task=this.storage.upload(this.filePath,img);
    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImagen=>{
          producto.imagen=urlImagen;
        this.inserProducto(producto);
        })
      })
    ).subscribe();
      }
      updateImagenProducto(producto: promociones, id: string,img:File){
        this.filePath = `Productos/${img.name}`;
        const fileRef=this.storage.ref(this.filePath);
        const task=this.storage.upload(this.filePath,img);
        task.snapshotChanges()
        .pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe(urlImagen=>{
              producto.imagen=urlImagen;
            this.updateProducto(producto,id);
            })
          })
        ).subscribe();
      }
  getProductos() {
    return this.Productos;
  }
  inserProducto(producto: promociones) {
    return this.ProductosCollection.add(producto);

  }
  deleteProducto(id: string) {
    return this.ProductosCollection.doc(id).delete();
  }
  updateProducto(producto: promociones, id: string) {
    return this.ProductosCollection.doc(id).update(producto);
  }
 
  getProducto(id: string) {
    return this.ProductosCollection.doc<promociones>(id).valueChanges();
  }
}

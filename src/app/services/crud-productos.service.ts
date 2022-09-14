import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { producto } from '../interfaces/producto';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {

  private filePath:any;
  private ProductosCollection: AngularFirestoreCollection<producto>;
  private Productos: Observable<producto[]>;
  constructor(private db: AngularFirestore,
    private storage:AngularFireStorage) {

    this.ProductosCollection = db.collection<producto>('Productos');
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
  addImgProducto(producto:producto,img:File){
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
      updateImagenProducto(producto: producto, id: string,img:File){
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
  inserProducto(producto: producto) {
    return this.ProductosCollection.add(producto);

  }
  deleteProducto(id: string) {
    return this.ProductosCollection.doc(id).delete();
  }
  updateProducto(producto: producto, id: string) {
    return this.ProductosCollection.doc(id).update(producto);
  }
 
  getProducto(id: string) {
    return this.ProductosCollection.doc<producto>(id).valueChanges();
  }
}

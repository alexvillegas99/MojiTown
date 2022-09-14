import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CrudCategoriasService } from '../../../services/crud-categorias.service';
import { categoria } from '../../../interfaces/categoria';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
Categoria?:categoria={
  nombre:'',
  imagen:'',
  estado:true,
  orden:100
}
selectedFile:File;
  constructor(private categoriaService:CrudCategoriasService,
    private alertCtrl:AlertController,
    private navCtrl:NavController) { }
  ngOnInit() {
  }
  chooseFile (event) {
    this.selectedFile = event.target.files[0];
  }

  async agregar(){
if(this.Categoria.nombre!==''  ){
this.categoriaService.addImgCategoria(this.Categoria,this.selectedFile);
this.navCtrl.navigateForward('/admin/administracion');
}else{
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Alerta',
    message: 'Llenar todos los campos',
    buttons: ['Aceptar']
  });
 
  await alert.present();
}
  }
}

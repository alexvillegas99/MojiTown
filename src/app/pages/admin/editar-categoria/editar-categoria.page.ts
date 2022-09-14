import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categoria } from '../../../interfaces/categoria';
import { CrudCategoriasService } from '../../../services/crud-categorias.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html',
  styleUrls: ['./editar-categoria.page.scss'],
})
export class EditarCategoriaPage implements OnInit {
  filePath:any;
  Categoria:categoria={
    nombre:'',
    imagen:'',
    estado: true,
    orden:100
  };
  constructor(private ruta: ActivatedRoute,
              private CategoriaService:CrudCategoriasService,
              private navCtrl:NavController,) { }
id='';
  ngOnInit() {
    this.id=this.ruta.snapshot.params.id;
    this.cargarCatgoria(this.id);
  }
  async cargarCatgoria(id){
    await this.CategoriaService.getCategoria(id).subscribe(res=>{
      this.Categoria = res;
    }) ;
    
  }
  chooseFile (event) {
    this.filePath = event.target.files[0];
  }
 async editar(){
    
if(this.Categoria.nombre!=='' ){
  this.CategoriaService.updateCategoria(this.Categoria,this.id);
  this.navCtrl.navigateForward('/admin/administracion')
  }else{
    this.CategoriaService.updateImagen(this.Categoria,this.id,this.filePath);
    this.navCtrl.navigateForward('/admin/administracion')
  }
  }

}

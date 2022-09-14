import { Pipe, PipeTransform } from '@angular/core';
import { producto } from '../interfaces/producto';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: producto[], texto:string ='',columna:string=''): producto[] {
   
   return arreglo.filter(
        item=>
          item.categoria===columna
      );
    }
  
}

import { environment } from '../../../environments/environment';
import { FileType } from '../../interfaces/file-type.enum';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from './../../models/usuario.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageRoute'
})
export class ImageRoutePipe implements PipeTransform {
  private baseUrl = environment.baseUrl;

  transform(object: Usuario | Hospital | Medico, type: FileType): string {
    if (object.img?.includes('https')) {
      return object.img;
    }

    if (!object || !object.uid || !object.img) {
      return this.baseUrl + '/uploads/no-image.jpg';
    }

    return this.baseUrl + '/uploads/' + type + '/' + object.img;
  }

}

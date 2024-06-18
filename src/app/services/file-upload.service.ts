import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FileType } from '../interfaces/file-type.enum';
import { AuthService } from './auth.service';
import { ResponseUploadImg } from '../interfaces/responses.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  public updatePhoto(file: File, type: FileType, fileId: string): Observable<ResponseUploadImg> {

    try {
      const url = this.baseUrl + '/uploads/' + type + '/' + fileId;
      const formData: FormData = new FormData();
      formData.append('imagen', file);
      const headers = this.authService.headersWithToken;

      return this.http.put<ResponseUploadImg>(url, formData, headers);

    } catch (error) {
      console.error(error);
      return of({ ok: false, filename: '', msg: 'Error al subir la imagen' });
    }
  }
}


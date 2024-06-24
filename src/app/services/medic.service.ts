import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ResponseCreateMedic, ResponseDelete, ResponseMedicsList, ResponseUpdateMedic } from '../interfaces/responses.interface';
import { CreateMedicForm, UpdateMedicoForm } from '../interfaces/forms.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private baseUrl = environment.baseUrl;

  private get headers() {
    return this.authService.headersWithToken;
  }

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  public getMedics(from: number, size?: number): Observable<ResponseMedicsList> {
    let url = this.baseUrl + '/medicos?from=' + from;

    if (size) {
      url += '&size=' + size;
    }

    return this.http.get<ResponseMedicsList>(url, this.headers);
  }

  public editMedic(formData: UpdateMedicoForm, medicId: string): Observable<ResponseUpdateMedic> {
    return this.http.put<ResponseUpdateMedic>(this.baseUrl + '/medicos/edit/' + medicId, formData, this.headers);
  }

  public deleteMedic(medicId: string): Observable<ResponseDelete> {
    return this.http.delete<ResponseDelete>(this.baseUrl + '/medicos/delete/' + medicId, this.headers);
  }

  public createMedic(formData: CreateMedicForm): Observable<ResponseCreateMedic> {
    return this.http.post<ResponseCreateMedic>(this.baseUrl + '/medicos/create', formData, this.headers);
  }

  public getById(id: string): Observable<ResponseCreateMedic> {
    return this.http.get<ResponseCreateMedic>(this.baseUrl + '/medicos/' + id, this.headers);
  }
}

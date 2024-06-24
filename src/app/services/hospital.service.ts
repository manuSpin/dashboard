import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ResponseCreateHospital, ResponseDelete, ResponseHospitalsList, ResponseUpdateHospital } from '../interfaces/responses.interface';
import { CreateHospitalForm, UpdateHospitalForm } from '../interfaces/forms.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private baseUrl = environment.baseUrl;

  private get headers() {
    return this.authService.headersWithToken;
  }

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  public getHospitals(from: number, size?: number): Observable<ResponseHospitalsList> {
    let url = this.baseUrl + '/hospitales?from=' + from;

    if (size) {
      url += '&size=' + size;
    }

    return this.http.get<ResponseHospitalsList>(url, this.headers);
  }

  public editHospital(formData: UpdateHospitalForm, hospitalId: string): Observable<ResponseUpdateHospital> {
    return this.http.put<ResponseUpdateHospital>(this.baseUrl + '/hospitales/edit/' + hospitalId, formData, this.headers);
  }

  public deleteHospital(hospitalId: string): Observable<ResponseDelete> {
    return this.http.delete<ResponseDelete>(this.baseUrl + '/hospitales/delete/' + hospitalId, this.headers);
  }


  public createHospital(formData: CreateHospitalForm): Observable<ResponseCreateHospital> {
    return this.http.post<ResponseCreateHospital>(this.baseUrl + '/hospitales/create', formData, this.headers);
  }


}

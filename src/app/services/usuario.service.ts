import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseCreateUser, ResponseUpdateUser } from '../interfaces/responses.interface';
import { Observable, tap } from 'rxjs';
import { RegisterForm, UpdateUserForm } from '../interfaces/forms.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.baseUrl;


  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  public createUser(formData: RegisterForm): Observable<ResponseCreateUser> {
    return this.http.post<ResponseCreateUser>(this.baseUrl + '/usuarios/create', formData).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  public editUser(formData: UpdateUserForm): Observable<ResponseUpdateUser> {
    formData = { ...formData, role: this.authService.usuario.role };

    const userId = this.authService.userId;
    const headers = this.authService.headersWithToken;

    return this.http.put<ResponseUpdateUser>(this.baseUrl + '/usuarios/edit/' + userId, formData, headers).pipe(
      tap(response => {
        this.authService.usuario.nombre = response.usuario.nombre;
        this.authService.usuario.apellidos = response.usuario.apellidos;
        this.authService.usuario.email = response.usuario.email;
      })
    );
  }

}

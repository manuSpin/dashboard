import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseCreateUser, ResponseDelete, ResponseUpdateUser, ResponseUsersList } from '../interfaces/responses.interface';
import { Observable, tap } from 'rxjs';
import { RegisterForm, UpdateUserForm } from '../interfaces/forms.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.baseUrl;

  private get headers() {
    return this.authService.headersWithToken;
  }


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

  public editUser(formData: UpdateUserForm, userId: string): Observable<ResponseUpdateUser> {
    return this.http.put<ResponseUpdateUser>(this.baseUrl + '/usuarios/edit/' + userId, formData, this.headers).pipe(
      tap(response => {
        if (this.authService.userId === response.usuario.uid) {
          this.authService.usuario.nombre = response.usuario.nombre;
          this.authService.usuario.apellidos = response.usuario.apellidos;
          this.authService.usuario.email = response.usuario.email;
        }
      })
    );
  }

  public getUsers(from: number, size?: number):Observable<ResponseUsersList> {
    let url = this.baseUrl + '/usuarios?from=' + from;

    if (size) {
      url += '&size=' + size;
    }

    return this.http.get<ResponseUsersList>(url, this.headers);
  }

  public deleteUser(userId: string): Observable<ResponseDelete> {
    return this.http.delete<ResponseDelete>(this.baseUrl + '/usuarios/delete/' + userId, this.headers);
  }

}

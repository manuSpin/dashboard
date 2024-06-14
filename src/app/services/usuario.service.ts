import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login.interface';
import { ResponseCreateUser, ResponseLogin, ResponseLoginGoogle } from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public login(formData: LoginForm): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(this.baseUrl + '/login', formData).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  public loginGoogle(token: string): Observable<ResponseLoginGoogle> {
    return this.http.post<ResponseLoginGoogle>(this.baseUrl + '/login/google', { token }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  public createUser(formData: RegisterForm): Observable<ResponseCreateUser> {
    return this.http.post<ResponseCreateUser>(this.baseUrl + '/usuarios/create', formData).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

}

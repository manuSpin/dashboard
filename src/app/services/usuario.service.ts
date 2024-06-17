import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login.interface';
import { ResponseCreateUser, ResponseGoogleAPILogin, ResponseLogin, ResponseLoginGoogle } from '../interfaces/responses.interface';
import { Router } from '@angular/router';
import { UserGoogle } from '../interfaces/userGoogle.interface';

declare const google: any;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.baseUrl;

  public auth2: any;

  constructor(private http: HttpClient,
    private router: Router) {
    this.googleInit();
  }

  public verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    const headers = { headers: { 'x-token': token } };

    return this.http.get<ResponseLogin>(this.baseUrl + '/login/renew', headers).pipe(
      tap((response: ResponseLogin) => {
        localStorage.setItem('token', response.token)
      }),
      map((response: ResponseLogin) => { return true }),
      catchError(error => of(false))
    );
  }

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

  public logout(): void {
    localStorage.removeItem('token');

    const userGoogle: UserGoogle = JSON.parse(localStorage.getItem('userGoogle') as string);

    if (!!(userGoogle && userGoogle.email)) {
      this.revokeSessionGoogle(userGoogle.email)
      localStorage.removeItem('userGoogle');
    }
    this.router.navigateByUrl('/login');
  }

  public createUser(formData: RegisterForm): Observable<ResponseCreateUser> {
    return this.http.post<ResponseCreateUser>(this.baseUrl + '/usuarios/create', formData).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  public googleInit(): void {
    google.accounts.id.initialize({
      client_id: "455434417213-r3p6utdoc9d2nv8b76g7a664l9b11qn1.apps.googleusercontent.com",
      callback: (response: ResponseGoogleAPILogin) => this.handleCredentialResponse(response)
    });
  }

  private handleCredentialResponse(response: ResponseGoogleAPILogin): void {
    this.loginGoogle(response.credential).subscribe((response: ResponseLoginGoogle) => {
      const { email, name, picture, token } = response;

      const userGoogle: UserGoogle = {
        email: email,
        name: name,
        picture: picture,
        token: token
      };

      localStorage.setItem('userGoogle', JSON.stringify(userGoogle));

      this.router.navigateByUrl('/');
    });
  }


  private revokeSessionGoogle(email: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      google.accounts.id.revoke(email, (resp: any) => {
        if (resp.error) {
          reject(resp.error);
        } else {
          resolve();
        }
      });
    });
  }

}

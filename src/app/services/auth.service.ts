import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../interfaces/login.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ResponseCreateUser, ResponseGoogleAPILogin, ResponseLogin, ResponseLoginGoogle } from '../interfaces/responses.interface';
import { environment } from '../../environments/environment';
import { UserGoogle } from '../interfaces/userGoogle.interface';
import { Usuario } from '../models/usuario.model';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;

  public usuario!: Usuario;

  public get token(): string {
    return localStorage.getItem('token') || '';
  }

  public get headersWithToken() {
    return { headers: { 'x-token': this.token } };
  }

  public get userId(): string {
    return this.usuario.uid!;
  }

  constructor(private http: HttpClient,
    private router: Router
  ) {
    this.googleInit();
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

  public googleInit(): void {
    google.accounts.id.initialize({
      client_id: "455434417213-r3p6utdoc9d2nv8b76g7a664l9b11qn1.apps.googleusercontent.com",
      callback: (response: ResponseGoogleAPILogin) => this.handleCredentialResponse(response)
    });
  }


  public verifyToken(): Observable<boolean> {
    return this.http.get<ResponseCreateUser>(this.baseUrl + '/login/renew', this.headersWithToken).pipe(
      map((response: ResponseCreateUser) => {
        const { nombre, apellidos, email, google, role, uid, img } = response.usuario;
        this.usuario = new Usuario(nombre, email, '', role, google, apellidos, img, uid);
        localStorage.setItem('token', response.token);

        return true;
      }),
      catchError(error => of(false))
    );
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

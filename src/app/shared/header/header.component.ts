import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
  })
  export class HeaderComponent {

  public usuario!: Usuario;
  public fullname: string = '';

  constructor(private authService: AuthService) {
    this.usuario = this.authService.usuario;
  }

  public logout() {
    this.authService.logout();
  }

}

import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  public menuItems: any[] = [];
  public usuario!: Usuario;


  constructor(private sidebarService: SidebarService,
    private authService: AuthService) {
    this.menuItems = this.sidebarService.menu;

    this.usuario = this.authService.usuario;
  }

  public logout() {
    this.authService.logout();
  }






}

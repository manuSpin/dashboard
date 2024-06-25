import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
  })
  export class HeaderComponent implements OnDestroy {

  public usuario!: Usuario;
  public fullname: string = '';

  public getSearchSubscription?: Subscription;

  constructor(private authService: AuthService,
    private router: Router) {
    this.usuario = this.authService.usuario;
  }

  public logout() {
    this.authService.logout();
  }

  public goSearch(term: string) {
    if (term.length !== 0) {
      this.router.navigateByUrl('/dashboard/busqueda/'+ term);
    }
  }

  ngOnDestroy(): void {
    if (this.getSearchSubscription) {
      this.getSearchSubscription.unsubscribe();
    }
  }

}

import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: MenuItem[] = [];
  constructor(private router: Router) { }

  public loadMenu(): MenuItem[] {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];

    if (this.menu.length === 0) {
      this.router.navigateByUrl('/login');
    }

    return this.menu;
  }
}


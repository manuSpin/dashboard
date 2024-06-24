import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: MenuItem[] = [
    {
      title: 'Inicio',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Inicio', url: '/' },
        { title: 'Gráficas', url: 'grafics' },
        { title: 'Barras de progreso', url: 'progress' },
        { title: 'Promesas', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: 'usuarios' },
        { title: 'Hospitales', url: 'hospitales' },
        { title: 'Médicos', url: 'medicos' }

      ]
    }
  ];

  constructor() { }
}

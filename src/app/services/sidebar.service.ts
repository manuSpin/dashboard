import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      title: 'Inicio',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Principal', url: '/' },
        { title: 'Gráficas', url: 'grafics' },
        { title: 'Barras de progreso', url: 'progress' },
        { title: 'Promesas', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ]
    }
  ];

  constructor() { }
}

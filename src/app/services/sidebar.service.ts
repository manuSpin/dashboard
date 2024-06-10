import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Grafics', url: 'grafics' },
        { title: 'Progress Bar', url: 'progress' },
        { title: 'Promises', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ]
    }
  ];

  constructor() { }
}

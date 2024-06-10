import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _linkTheme: Element | null = document.querySelector('#theme');

  constructor() { }

  public get linkTheme(): Element | null {
    return this._linkTheme;
  }

  public setTheme() {
    const themeStorage = localStorage.getItem('theme');
    const theme = themeStorage != null ? themeStorage : 'blue-dark';
    const url = './assets/css/colors/' + theme + '.css'

    this.linkTheme!.setAttribute('href', url);
  }

  public changeTheme(theme: string): void {
    const url = './assets/css/colors/' + theme + '.css'

    this.linkTheme!.setAttribute('href', url);
    localStorage.setItem('theme', theme);

    this.selectCurrentTheme();
  }

  public selectCurrentTheme(): void {
    const linkTheme = document.querySelector('#theme');
    const links: NodeListOf<Element> =  document.querySelectorAll('.selector');

    links.forEach(element => {
      element.classList.remove('working');

      const themeUrl = './assets/css/colors/' + element.getAttribute('data-theme') + '.css';
      const actualThemeUrl = linkTheme!.getAttribute('href');

      if (themeUrl === actualThemeUrl) {
        element.classList.add('working');
      }
    });
  }
}

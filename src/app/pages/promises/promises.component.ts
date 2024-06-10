import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: ``
})
export class PromisesComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });

  }

  public getUsuarios() {
   return new Promise(resolve => {
      fetch('https://reqres.in/api/users').then(response => response.json()).then(body => resolve(body.data));
    });
  }

}

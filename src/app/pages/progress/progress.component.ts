import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  public progress1 = 25;
  public progress2 = 35;

  public getPercentage1(): string {
    return this.progress1 + '%';
  }

  public getPercentage2(): string {
    return this.progress2 + '%';
  }

}

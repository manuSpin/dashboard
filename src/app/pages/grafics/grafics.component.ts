import { Component } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styles: ``
})
export class GraficsComponent {

  public labels1: string[] = ['Patatas fritas', 'Pasta', 'Queso'];

  public colors: Color[] = ['#B21CA1', '#0AFE15', '#F3F354'];

  public data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      {
        data: [2, 10, 5],
        backgroundColor: this.colors
      }
    ]
  };
}

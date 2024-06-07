import { Component, Input } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-doghnut-chart',
  templateUrl: './doghnut-chart.component.html',
  styles: ``
})
export class DoghnutChartComponent {

  public colors: Color[] = ['#6857E6', '#009FEE', '#F02059'];

  @Input() public title: string = 'Sin título';
  @Input('labels') public labels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: this.colors
      }
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

}

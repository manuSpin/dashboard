import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementatorComponent } from './incrementator/incrementator.component';
import { FormsModule } from '@angular/forms';
import { DoghnutChartComponent } from './doghnut-chart/doghnut-chart.component';
import { BaseChartDirective } from 'ng2-charts';



@NgModule({
  declarations: [
    IncrementatorComponent,
    DoghnutChartComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective
  ],
  exports: [
    IncrementatorComponent,
    DoghnutChartComponent
  ]
})
export class ComponentsModule { }

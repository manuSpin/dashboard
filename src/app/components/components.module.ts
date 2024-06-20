import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementatorComponent } from './incrementator/incrementator.component';
import { FormsModule } from '@angular/forms';
import { DoghnutChartComponent } from './doghnut-chart/doghnut-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    IncrementatorComponent,
    DoghnutChartComponent,
    ModalImageComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,
    SharedModule
  ],
  exports: [
    IncrementatorComponent,
    DoghnutChartComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }

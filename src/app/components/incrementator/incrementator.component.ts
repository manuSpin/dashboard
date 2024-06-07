import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styles: ``
})
export class IncrementatorComponent implements OnInit {

  @Input('value') public progress: number = 10;
  @Input() btnClass: string = 'btn-primary';
  @Output('valueEmited') public onValueChange: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = 'btn ' + this.btnClass;
  }

  public changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.progress = 100;
      this.onValueChange.emit(100

      );
    } else if (this.progress <= 0 && value <= 0) {
      this.progress = 0;
      this.onValueChange.emit(0);

    } else {
      this.progress += value;
      this.onValueChange.emit(this.progress);
    }
  }

  public onChange(newValue: number): void {
    if (newValue > 100) {
      this.progress = 100;

    } else if (newValue < 0) {
      this.progress = 0;

    } else {
      this.progress = newValue;
    }

    this.onValueChange.emit(this.progress);
  }

  public isInvalid(): boolean {
    return this.progress > 100 || this.progress < 0
  }

}

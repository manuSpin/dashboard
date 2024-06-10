import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {

  public intervalSubscription?: Subscription;

  constructor() {
    // this.returnAnObservable().pipe(retry(2)).subscribe(
    //   value => console.log('Subs: ', value),
    //   error => console.error('Error: ', error),
    //   () => console.info('Fin')
    // );

    this.intervalSubscription = this.returnAnInterval().subscribe(console.log);

  }

  public returnAnInterval(): Observable<number> {
    return interval(100).pipe(
      map(value => ++value),
      filter(value => value % 2 === 0),
      // take(10),
    );
  }


  public returnAnObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('Fatal');
        }
      }, 1000)
    });
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

}

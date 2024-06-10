import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
export class BreadcrumbsComponent implements OnDestroy {
  public title: string = '';
  public tituloSubscription?: Subscription;

  constructor(private router: Router) {
    this.tituloSubscription = this.getRouteData().subscribe(({title}) => {
      this.title = title;
      document.title = 'AdminPro - ' + title;
    });
  }

  public getRouteData() {
    return this.router.events.pipe(
      map(event => event as ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot?.firstChild === null),
      map((event: ActivationEnd) => { return event.snapshot.data })
    );
  }

  ngOnDestroy(): void {
    if (this.tituloSubscription) {
      this.tituloSubscription.unsubscribe();
    }
  }

}

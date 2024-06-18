import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficsComponent } from './grafics/grafics.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Inicio' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes' } },
      { path: 'grafics', component: GraficsComponent, data: { title: 'Gráficas' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Barras de progreso' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil del usuario' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

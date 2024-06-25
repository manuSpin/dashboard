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
import { UsersComponent } from './managements/users/users.component';
import { HospitalsComponent } from './managements/hospitals/hospitals.component';
import { MedicsComponent } from './managements/medics/medics.component';
import { MedicComponent } from './management/medic/medic.component';
import { SearchesComponent } from './searches/searches.component';
import { AdminGuard } from '../guards/admin.guard';


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
      { path: 'usuarios', component: UsersComponent, data: { title: 'Mantenimiento de usuarios' }, canActivate: [AdminGuard] },
      { path: 'hospitales', component: HospitalsComponent, data: { title: 'Mantenimiento de  Hospitales' } },
      { path: 'medicos', component: MedicsComponent, data: { title: 'Mantenimiento de  Médicos' } },
      { path: 'medico/:id', component: MedicComponent, data: { title: 'Perfil del médico' } },
      { path: 'busqueda/:termino', component: SearchesComponent, data: { title: 'Búsqueda general' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {ReservasComponent} from './components/reservas/reservas.component';
import {ReservaComponent} from './components/reserva/reserva.component';

const routes: Routes = [
  { path: 'reservas', component: ReservasComponent },
  { path: 'reserva/:id', component: ReservaComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'reservas'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

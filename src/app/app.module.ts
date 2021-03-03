import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';


// Routes
import {AppRoutingModule} from './app-routing.module';


// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservasComponent } from './components/reservas/reservas.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReservaComponent,
    ReservasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgTempusdominusBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

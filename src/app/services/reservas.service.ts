import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservaModel} from '../models/reserva.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }
  url = 'https://cientifica-cedc7-default-rtdb.firebaseio.com';


  crearReserva(reserva: ReservaModel){
    return this.http.post(`${this.url}/reservas.json`, reserva)
      .pipe(
        map( ( resp: any) => {
        reserva.id = resp.name;
        return reserva;
      })
      );
  }

  actualizarReserva(reserva: ReservaModel){

    const reservaTemp = {
      ...reserva
    };

    delete reservaTemp.id;

    return this.http.put(`${this.url}/reservas/${reserva.id}.json`, reservaTemp);

  }

getReservas(){
  return this.http.get(`${this.url}/reservas.json`)
    .pipe(
      map(resp => {
        return this.crearArreglo(resp);
      })
    );
}

private crearArreglo(obj: object){
    if (obj === null) { return []; } // Validacion para retornar un array vacio se es que el objeto es null

    const reservas: ReservaModel[] = [];

    Object.keys(obj).forEach(key => {
        const reserva: ReservaModel = obj[key];
        reserva.id = key;
        reservas.push(reserva);
    });

    return reservas;

}


getReserva(id: string){
    return this.http.get(`${(this.url)}/reservas/${id}.json`);
}

borrarReserva(id: string){
    return this.http.delete(`${(this.url)}/reservas/${id}.json`);
}




}

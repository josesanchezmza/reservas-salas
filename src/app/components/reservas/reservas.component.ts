import { Component, OnInit } from '@angular/core';
import {ReservaModel} from '../../models/reserva.model';
import {ReservasService} from '../../services/reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {


  cargando = false;
  reservas: ReservaModel[] = [];


  constructor(private reservasService: ReservasService) { }

  ngOnInit(): void {
    this.cargando = true;

    this.reservasService.getReservas().subscribe(
      resp => {
        setTimeout( () => {
          this.reservas = resp;
          this.cargando = false;
        }, 500);

      });
  }

  borrarReserva(reserva: ReservaModel, i: number ){

    Swal.fire({
      title: 'Esta Seguro?',
      text: 'La Reserva no podrá recuperarse una vez borrada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarla!',
      cancelButtonText: 'No, conservarla'
    }).then((result) => {
      if (result.value) {

        this.reservasService.borrarReserva(reserva.id).subscribe(
          () => {
            this.reservas.splice(i, 1);

            Swal.fire(
              'Hecho!',
              `La Reserva ha sido borrada.`,
              'success'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          `La Reserva se encuentra bien :).`,
          'error'
        );
      }
    });



  }


}

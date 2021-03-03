import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ReservaModel} from '../../models/reserva.model';
import {ReservasService} from '../../services/reservas.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {



  constructor(private fb: FormBuilder,
              private reservaService: ReservasService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.crearFormulario();
  }

  formulario: FormGroup;
  reserva: ReservaModel;
  reservas: ReservaModel[] = [];


  fechaInicio = new Date();
  fechaFin = new Date();

  startOptions: any = { format: 'DD/MM/YYYY HH:mm',
    inline: false,
    sideBySide: true};

  endOptions: any = {format: 'DD/MM/YYYY HH:mm',
    inline: false,
    sideBySide: true};




  ngOnInit(): void {
    this.fechaFin.setHours(this.fechaInicio.getHours() + 1);

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.reservaService.getReserva(id).subscribe( (resp: ReservaModel) => {
        if (resp === null){
          Swal.fire({
            title: 'No Existe!',
            text: `La Reserva no existe`,
            icon: 'warning',
            allowOutsideClick: false
          });
          this.router.navigate(['reservas']);
        } else {
          this.reserva = resp;
          this.reserva.id = id;


          this.formulario.reset(this.reserva);
        }

      });
    }
  }


  crearFormulario(): void{
    this.formulario = this.fb.group({
      id: [],
      desde: [this.fechaInicio, Validators.required],
      hasta: [this.fechaFin, Validators.required],
      persona: [, [Validators.required, Validators.minLength(4)]],
      sala: [, Validators.required]
    });
  }





  async guardar( ): Promise<boolean> {
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    const valida = await this.fechaValida();

    if (!valida){
      Swal.fire({
        title: 'No Disponible',
        text: 'Ya existe una reserva para ese rango horario.',
        icon: 'warning',
        allowOutsideClick: false
      });
      return;
    }


    this.reserva = this.formulario.value;
    if (this.reserva.id) {
      this.reservaService.actualizarReserva(this.reserva)
        .subscribe(resp => {
          Swal.fire(
            'Actualizado!',
            'La Reserva ha sido Actualizada.',
            'success'
          );
          this.router.navigate(['reservas']);

        });
    } else {
      this.reservaService.crearReserva(this.reserva)
        .subscribe(resp => {
          this.formulario.setValue(resp);
          Swal.fire(
            'Guardado!',
            'La Reserva ha sido Creada.',
            'success'
          );
          this.router.navigate(['reservas']);
        });
    }

  }


  fechaValida(): Promise<boolean> {
    const desdeForm = new Date(this.formulario.value.desde);
    const hastaForm = new Date(this.formulario.value.hasta);
    const salaForm = this.formulario.value.sala;
    const idForm = this.formulario.value.id;
    let flag = false;


    return new Promise((resolve) => {
      this.reservaService.getReservas().subscribe((resp) => {
        this.reservas = resp.filter( res => res.sala === salaForm);


        if (this.reservas.length === 0) {
            resolve (true);
        }


        for (const reserva of this.reservas) {
          const desdeDB = new Date(reserva.desde);
          const hastaDB = new Date(reserva.hasta);

          if (idForm !== reserva.id) {
            if (desdeForm < desdeDB && hastaForm < desdeDB) {
              flag = true;
            } else if (desdeForm > hastaDB && hastaForm > hastaDB) {
              flag = true;
            } else {
              flag = false;
              resolve(flag);
            }
          }
        }
        resolve(flag);
      });
    });
    }


}

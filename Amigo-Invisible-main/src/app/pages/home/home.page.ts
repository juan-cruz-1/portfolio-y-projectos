import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { listaDeEventos } from 'src/assets/fakeData';
import { howLongFromPastDate } from '../../core/helpers/time';
import { evento, eventoDefault } from '../../core/interfaces/evento';
import { EventosService } from '../../core/services/eventos.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewWillEnter {
  filtro:"abiertos" | "finalizados" | "todos" = "abiertos";

  constructor(private storage:StorageService, private es:EventosService) { }
  ionViewWillEnter(): void {
    this.getEventos(this.filtro);
  }


  async getEventos(filter: "abiertos" | "finalizados" | "todos" = "abiertos"){
    const eventos:evento[] = await this.es.getEventos(filter)
    this.eventos = eventos;
  }

  eventos:evento[] = listaDeEventos;

  rtf = new Intl.RelativeTimeFormat("es",{
    localeMatcher: 'best fit',
    numeric: 'always',
    style: 'long',
  })

  getDiasHastaEvento(fechaEvento:Date){
    return howLongFromPastDate(fechaEvento);
  //   const hoy = new Date().getTime()
  //   const diasDiferencia = (fechaEvento.getTime() - hoy)/(1000*60*24);
  //   if(Math.abs(diasDiferencia) > 1){
  //     return this.rtf.format(diasDiferencia,"days")
  //   } else{
  //     return "hoy";
  //   }
  }
}

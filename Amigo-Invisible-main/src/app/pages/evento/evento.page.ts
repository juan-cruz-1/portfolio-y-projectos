import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { evento } from 'src/app/core/interfaces/evento';
import { EventosService } from 'src/app/core/services/eventos.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage {

  evento?:evento;
  result?: string;

  constructor(
    private ar:ActivatedRoute,
    private es:EventosService,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private ts: ToastService) {
    ar.params.subscribe(param =>{
      this.es.getEventoById(param["id"]).then(evento => this.evento = evento);
    })
   }

  async modalMostrar(id:number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Mostrar a quien regala',
      subHeader: '¿Estás seguro de que querés ver esta información?',
      buttons: [
        {
          text: 'Mostrar',
          role: "cambiar",
          data: {
            action: 'mostrar',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if(result.role === "cancel") return;
    if(result.role === "cambiar") {
      this.evento!.participantes[id].mostrar = !this.evento?.participantes[id].mostrar
    }
  }

  atras(){
    this.navCtrl.navigateRoot("")
  }

  async modalBorrar() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Eliminando evento',
      subHeader: '¿Estás seguro de que querés eliminar este evento?',
      buttons: [
        {
          text: 'Borrar',
          role: "borrar",
          data: {
            action: 'borrar',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if(result.role === "cancel") return;
    if(result.role === "borrar") {
      this.es.borrarEvento(this.evento!.id!)
    }
    this.atras()
  }

  async modalResortear() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Eliminando evento',
      subHeader: '¿Estás seguro de que querés re-sortear este evento?',
      buttons: [
        {
          text: 'Resortear',
          role: "resortear",
          data: {
            action: 'resortear',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if(result.role === "cancel") return;
    if(result.role === "resortear") {
      const nuevoEvento = this.es.sortearEvento(this.evento!);
      this.es.editEvento(nuevoEvento);
    }
    this.ts.toastDefault("¡Evento sorteado nuevamente!");
  }

  async modalFinalizar() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Cambiando estado al evento',
      subHeader: this.evento!.finalizado ? "¿Desea restaurar este evento?" : "¿Desea finalizar y bloquear este evento?",
      buttons: [
        {
          text: this.evento!.finalizado ? "Restaurar evento" : "Terminar evento",
          role: "cambiar",
          data: {
            action: 'cambiar',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if(result.role === "cancel") return;
    if(result.role === "cambiar") {
      this.evento!.finalizado = !this.evento!.finalizado
      this.es.editEvento(this.evento!);
    }
    this.ts.toastDefault(this.evento!.finalizado ? "¡Evento terminado!" : "Evento restaurado");
    if(this.evento!.finalizado) this.atras();
  }
}

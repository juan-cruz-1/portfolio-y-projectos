import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { evento } from 'src/app/core/interfaces/evento';
import { personaVacia } from 'src/app/core/interfaces/personas';
import { EventosService } from 'src/app/core/services/eventos.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.page.html',
  styleUrls: ['./nuevo-evento.page.scss'],
})
export class NuevoEventoPage  {

  hoy:string;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private es:EventosService,
    private ts:ToastService
  ) {
    this.hoy = new Date().toISOString();
   }

  eventoActual:evento = {
    nombre: "",
    participantes: [{...personaVacia},{...personaVacia},{...personaVacia},{...personaVacia}],
    fecha_limite: new Date()
  }
  descartar(){
    this.navCtrl.navigateRoot("")
  }

  cambiarFecha(fechaStr:any){
    this.eventoActual.fecha_limite = new Date(fechaStr.detail.value);
  }

  async guardarForm(){
    const participantesReales = this.eventoActual.participantes.filter(participante => participante.nombre !== "");
    if(participantesReales.length < 3) return this.alertFaltanParticipantes()
    const eventoSorteado = this.es.sortearEvento(this.eventoActual);
    const idEvento = await this.es.setNuevoEvento(eventoSorteado);
    this.ts.toastDefault("¡Evento agegado!");
    this.navCtrl.navigateForward(['eventos',idEvento])
    return
  }

  async alertFaltanParticipantes() {
    const alert = await this.alertController.create({
      header: 'Faltan participantes',
      message: 'Un evento debe tener al menos tres participantes',
      buttons: ['OK'],
    });

    await alert.present();
  }

  agregarEspacioParticipante(){
    this.eventoActual.participantes.push({...personaVacia});
  }

  eliminarEspacioParticipante(i:number){
    const nuevosParticipantes = Array.from(this.eventoActual.participantes);
    nuevosParticipantes.splice(i,1);
    this.eventoActual.participantes=nuevosParticipantes;
  }
}

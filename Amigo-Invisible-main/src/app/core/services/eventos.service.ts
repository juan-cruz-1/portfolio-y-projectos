import { Injectable } from '@angular/core';
import { listaDeEventos } from 'src/assets/fakeData';
import { evento } from '../interfaces/evento';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private storage:StorageService) { }

  async getEventos(filter: "abiertos" | "finalizados" | "todos" = "abiertos") :Promise<evento[]>{
    const eventos = await this.storage.get("eventos");
    switch (filter){
      case "todos":
        return eventos;
      case "abiertos":
        return eventos.filter((evento:evento) => evento.finalizado !== true)
      case "finalizados":
        return eventos.filter((evento:evento) => evento.finalizado === true)
    }
  }

  async getEventoById(id:number) : Promise<evento | undefined>{
    const eventos = await this.getEventos("todos")
    const eventoSeleccionado = eventos.find(evento => evento.id == id)
    return eventoSeleccionado
  }

  async setNuevoEvento(evento:evento):Promise<number>{
    const nuevoEvento = evento;
    let eventosActuales: evento[] = await this.getEventos("todos");
    if (!eventosActuales || eventosActuales.length === 0) {
      eventosActuales = []
      nuevoEvento.id = 1;
    } else {
      nuevoEvento.id = eventosActuales[eventosActuales.length-1].id!+1;
    }
    eventosActuales.push(nuevoEvento);
    this.storage.set("eventos",eventosActuales);
    return nuevoEvento.id
  }

  async editEvento(editEvento:evento){
    const eventos:evento[] = await this.storage.get("eventos");
    const nuevoEventos:evento[] = eventos.filter((evento:evento) => evento.id != editEvento.id)
    eventos.forEach(evento =>{
      evento.participantes.forEach(participante => participante.mostrar = false);
    })
    nuevoEventos.push(editEvento);
    nuevoEventos.sort((a, b) => a.id! - b.id! )
    this.storage.set("eventos",nuevoEventos);
    return
  }

  async borrarEvento(id:number){
    const eventos = await this.storage.get("eventos");
    const nuevoEventos = eventos.filter((evento:evento) => evento.id != id)
    this.storage.set("eventos",nuevoEventos);
  }

  sortearEvento(evento:evento):evento{
    const nuevoEvento = evento;

    let participantesDisponibles:string[] = [];
    evento.participantes.forEach((participante, i) =>  {
      if(participante.nombre === ""){
        evento.participantes.splice(i,1)
        participantesDisponibles.push(evento.participantes[i].nombre)
      } else {
        participantesDisponibles.push(participante.nombre)
      }
    })

    nuevoEvento.participantes.forEach((participante) =>{
      let posiciónAleatoria: number | undefined;
      do {
        posiciónAleatoria = Math.floor(Math.random()*participantesDisponibles.length)
      }
      while( participante.nombre === participantesDisponibles[posiciónAleatoria])
      participante.regala = participantesDisponibles[posiciónAleatoria];
      participantesDisponibles.splice(posiciónAleatoria,1);
    })
    return nuevoEvento;
  }
}

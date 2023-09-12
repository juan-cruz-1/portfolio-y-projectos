import { persona, personaDefault } from "./personas";

export interface evento{
  id?: number;
  nombre: string;
  fecha_limite: Date;
  participantes:persona[];
  finalizado?:boolean;
}

export const eventoDefault:evento = {
  id:1,
  nombre: "Cumpleaños",
  fecha_limite: new Date(new Date().getTime() + 1000*60*24),
  participantes: [personaDefault, personaDefault]
}


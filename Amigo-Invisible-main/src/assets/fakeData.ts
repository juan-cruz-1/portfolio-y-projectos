import { evento, eventoDefault } from "src/app/core/interfaces/evento";
import { personaDefault } from "src/app/core/interfaces/personas";

const eventoDefault2:evento = {
  id:2,
  nombre: "Navidad",
  fecha_limite: new Date(new Date().getTime() + 1000*60*24*10),
  participantes: [personaDefault, personaDefault]
}

export const listaDeEventos:evento[] = []


export interface persona{
    nombre: string,
    mostrar?:boolean,
    regala?:string,
}


export const personaDefault:persona = {
  nombre:"Juan",
}


export const personaVacia:persona = {
  nombre: "",
}

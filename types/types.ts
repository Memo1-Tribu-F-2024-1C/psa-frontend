export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  razon_social: string
  cuit: number
}

export interface Proyecto {
  id: number;
  nombre: string;
  lider: string;
  estado: EstadoTarea;
  fechaCreacion: string;
  fechaFinalizacion: string;
}

export enum EstadoTarea {
  NO_INICIADO = 'No iniciado',
  EN_PROCESO = 'En proceso',
  FINALIZADO = 'Finalizado',
  BLOQUEADO = 'Bloqueado',
}
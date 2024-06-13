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
  estado: EstadoProyecto;
  fechaCreacion: string;
  fechaFinalizacion: string;
}


export interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  estado: EstadoTarea;
  fechaCreacion: string;
  colaborador: any;
  proyecto: any;
}

export enum EstadoTarea {
  NUEVO = 'Nuevo',
  EN_PROGRESO = 'En progreso',
  CERRADO = 'Cerrado',
  BLOQUEADO = 'Bloqueado',
}

export enum EstadoProyecto {
  EMPEZADO = 'Empezado',
  EN_CURSO = 'En curso',
  TERMINADO = 'Terminado',
  SUSPENDIDO = 'Suspendido',
}
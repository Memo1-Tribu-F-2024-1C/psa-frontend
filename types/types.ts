export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id_cliente: string
  razon_social: string
  cuit: string
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
  prioridad: PrioridadTarea;
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

export enum PrioridadTarea {
  ALTA = 'Alta',
  MEDIA= 'Media',
  BAJA = 'Baja',
}

export interface Ticket {
  numero: number;
  descripcion: string;
  estado: string;
  severidad: string;
  fechaCreacion: string;
  deadline: string;
  idProducto: number;
  idVersion: number;
  cliente: any;
}

export interface Producto {
  codigo: number;
  nombre: string;
  versiones: VersionProducto[]
}

export interface VersionProducto {
  codigo: number;
  nombre: string;
  fechaCreacion: string;
  idProducto: number;
}
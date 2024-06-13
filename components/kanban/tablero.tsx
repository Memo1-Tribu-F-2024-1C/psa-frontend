// pages/index.js
import { useState } from 'react';
import TarjetaTarea from '../tarjetaTarea';


const KanbanBoard = ({ tasks }:{tasks:any}) => {
  
  // Organize tasks into columns based on their 'estado' property
  
  const iniciados = tasks.filter((objeto : any) => objeto['estado'] === 'No iniciado');
  const enProgreso = tasks.filter((objeto : any) => objeto['estado'] === 'En proceso');
  const bloqueado = tasks.filter((objeto : any) => objeto['estado'] === 'Bloqueado');
  const finalizado = tasks.filter((objeto : any) => objeto['estado'] === 'Finalizado');

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col col-span-1 bg-gray-300 p-4">
        {/* Contenido de la primera columna */}
            No iniciada   
            
                {iniciados.map((tarea:any, index: number) => (
                                    <TarjetaTarea key={index} tarea={tarea} />
                                ))}
 
        </div>
      <div className="col-span-1 bg-blue-300 p-4">
        {/* Contenido de la segunda columna */}
        En proceso
        {enProgreso.map((tarea: any, index: number) => (
                                    <TarjetaTarea key={index} tarea={tarea} />
                                ))}
      </div>
      <div className="col-span-1 bg-green-300 p-4">
        {/* Contenido de la tercera columna */}
        Finalizado
        {finalizado.map((tarea: any, index: number) => (
                                    <TarjetaTarea key={index} tarea={tarea} />
                                ))}
      </div>
      <div className="col-span-1 bg-red-300 p-4">
        {/* Contenido de la tercera columna */}
        Bloqueada
        {bloqueado.map((tarea: any, index: number) => (
                                    <TarjetaTarea key={index} tarea={tarea} />
                                ))}
      </div>
    </div>
  )
  
  
};


export default KanbanBoard;

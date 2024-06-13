import { Bigelow_Rules } from "next/font/google";
import styles from "./mostrarProyecto.module.css";
import ProgressBar from "./progressBar";

export default function MostrarProyecto( { proyecto,Tareas} : {proyecto: any; Tareas:any} ){
      
    const cantidadTareas = Tareas.length;
    const iniciados = Tareas.filter((objeto : any) => objeto['estado'] === 'Nuevo').length;
    const enProgreso = Tareas.filter((objeto : any) => objeto['estado'] === 'En curso').length;
    const bloqueado = Tareas.filter((objeto : any) => objeto['estado'] === 'Bloqueado').length;
    const finalizado = Tareas.filter((objeto : any) => objeto['estado'] === 'Cerrado').length;
    
    return (
        <div className={styles.cajaProyecto}>
            <div className={styles.caja1} >
                <b>ID: </b> <b className="text-bold text-gray-600"> {proyecto['id']} </b> <br/>
                <b>Nombre: </b><b className="text-bold text-gray-600"> {proyecto['nombre']} </b><br/>
                <b>Descripción: </b><b className="text-bold text-gray-600"> {proyecto['descripcion']} </b><br/>
                <b>Lider: </b> <b className="text-bold text-gray-600">{proyecto['lider'].nombre}</b> <b className="text-bold text-gray-600">{proyecto['lider'].apellido}</b> <br/>
        </div>

            <div className={styles.caja2}>
                           
                                
                <div>Total de Tareas:{cantidadTareas}</div>
                <div className='flex'>
                    <div className="w-40 ">Tareas en progreso: {enProgreso} </div>
                    <div className="flex-grow "><ProgressBar totalTasks={cantidadTareas} completedTasks={enProgreso}/> </div>
                </div>

                <div className='flex'>
                    <div className="w-40 ">Tareas no iniciadas: {iniciados} </div>
                    <div className="flex-grow "><ProgressBar totalTasks={cantidadTareas} completedTasks={iniciados}/> </div>
                </div>
                
                <div className='flex'>
                    <div className="w-40 ">Tareas bloqueadas: {bloqueado} </div>
                    <div className="flex-grow "><ProgressBar totalTasks={cantidadTareas} completedTasks={bloqueado}/> </div>
                </div>
                
                <div className='flex'>
                    <div className="w-40 ">Tareas finalizadas: {finalizado} </div>
                    <div className="flex-grow "><ProgressBar totalTasks={cantidadTareas} completedTasks={finalizado}/> </div>
                </div>

            
               
                
            </div>       
        </div>
    )
}
import { Bigelow_Rules } from "next/font/google";
import styles from "./mostrarProyecto.module.css";
import ProgressBar from "./progressBar";

export default function MostrarProyecto( { proyecto,Tareas} : {proyecto: any; Tareas:any} ){
      
    const cantidadTareas = Tareas.length;
    const iniciados = Tareas.filter((objeto : any) => objeto['estado'] === 'No iniciado').length;
    const enProgreso = Tareas.filter((objeto : any) => objeto['estado'] === 'En proceso').length;
    const bloqueado = Tareas.filter((objeto : any) => objeto['estado'] === 'Bloqueado').length;
    const finalizado = Tareas.filter((objeto : any) => objeto['estado'] === 'Finalizado').length;
    
    return (
        <div className={styles.cajaProyecto}>
            <div className={styles.caja1} >
                <b>ID: </b>{proyecto['id']}<br/>
                <b>Nombre: </b>{proyecto['nombre']}<br/>
                <b>Descripción: </b>{proyecto['descripcion']}<br/>


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
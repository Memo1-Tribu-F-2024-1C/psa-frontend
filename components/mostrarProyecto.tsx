import { Bigelow_Rules } from "next/font/google";
import styles from "./mostrarProyecto.module.css";

export default function MostrarProyecto({ proyecto, Tareas }: { proyecto: any; Tareas: any }) {

    const cantidadTareas = Tareas.length;
    const nuevas = Tareas.filter((objeto: any) => objeto['estado'] === 'Nuevo').length;
    const enProgreso = Tareas.filter((objeto: any) => objeto['estado'] === 'En progreso').length;
    const bloqueado = Tareas.filter((objeto: any) => objeto['estado'] === 'Bloqueado').length;
    const cerradas = Tareas.filter((objeto: any) => objeto['estado'] === 'Cerrado').length;

    return (
        <div className={styles.cajaProyecto}>
            <div className={styles.caja1} >
                <div className="task-row my-1">
                    <b>ID: </b> <b className=" text-gray-200"> {proyecto['id']} </b> <br />
                </div>
                <div className="task-row my-1">
                    <b>Nombre: </b><b className=" text-gray-200"> {proyecto['nombre']} </b><br />
                </div>
                <div className="task-row my-1">
                    <b>Descripción: </b><b className=" text-gray-200"> {proyecto['descripcion']} </b><br />
                </div>
                <div className="task-row my-1">
                    <b>Lider: </b>
                    {proyecto['lider'] ? (
                        <b className=" text-gray-200">{proyecto['lider'].nombre} {proyecto['lider'].apellido}</b>
                    ) :

                        (
                            <span className="text-gray-200">No asignado</span>
                        )}
                    <br />
                </div>
                <div className="task-row my-1">
                    <b>Estado proyecto: </b><b className=" text-gray-200"> {proyecto['estado']} </b><br />
                </div>
            </div>

            <div className={styles.caja2}>
                <div className="task-container">
                    <div className="task-row my-1">
                        <b>Tareas nuevas:</b><span className= "whitespace-pre">                {nuevas}</span>
                    </div>
                    <div className="task-row my-1">
                        <b>Tareas en progreso:</b><span className= "whitespace-pre">       {enProgreso}</span>
                    </div>
                    <div className="task-row my-1">
                        <b>Tareas bloqueadas:</b><span className= "whitespace-pre">        {bloqueado}</span>
                    </div>
                    <div className="task-row my-1">
                        <b>Tareas cerradas:</b><span className= "whitespace-pre">             {cerradas}</span>
                    </div>
                    <div className="task-row my-1">
                        <b>Total de tareas:</b><span className= "whitespace-pre">              {cantidadTareas}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
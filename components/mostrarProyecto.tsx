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
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">ID: </div>
          <div className="flex-grow"> {proyecto['id'] + 3672}</div>
        </div>
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">Nombre: </div>
          <div className="flex-grow"> {proyecto['nombre']}</div>
        </div>
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">Descripción: </div>
          <div className="flex-grow"> {proyecto['descripcion']}</div>
        </div>
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">Lider: </div>
          <div className="flex-grow">{proyecto['lider'] ? 
            (<b className="font-normal">{proyecto['lider'].nombre} {proyecto['lider'].apellido}</b>) :
            (<span className="font-normal">No asignado</span>)}</div>
        </div>

        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">Estado proyecto: </div>
          <div className="flex-grow"> {proyecto['estado']}</div>
        </div>
      </div>

      <div className={styles.caja2}>
        <div className="task-container">
          <div className='task-row my-1 flex font-normal'>
            <div className="w-60 ">Tareas nuevas: </div>
            <div className="flex-grow"> {nuevas}</div>
          </div>
          <div className='task-row my-1 flex font-normal'>
            <div className="w-60 ">Tareas en progreso: </div>
            <div className="flex-grow"> {enProgreso}</div>
          </div>
          <div className='task-row my-1 flex font-normal'>
            <div className="w-60 ">Tareas bloqueadas: </div>
            <div className="flex-grow"> {bloqueado}</div>
          </div>
          <div className='task-row my-1 flex font-normal'>
            <div className="w-60 ">Tareas cerradas: </div>
            <div className="flex-grow"> {cerradas}</div>
          </div>
          <div className='task-row my-1 flex font-semibold text-xl'>
            <div className="w-60 italic">Total de tareas: </div>
            <div className="flex-grow"> {cantidadTareas}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
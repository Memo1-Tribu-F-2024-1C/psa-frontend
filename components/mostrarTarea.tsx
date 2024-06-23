import styles from "./mostrarTarea.module.css";

export default function MostrarTarea({ proyecto, tarea }: { proyecto: any; tarea: any }) {

  return (
    <div className={styles.cajaTarea}>
      <div className={styles.caja1} >
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">ID proyecto: </div>
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
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">ID tarea: </div>
          <div className="flex-grow"> {tarea['id']}</div>
        </div>
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">Nombre: </div>
          <div className="flex-grow"> {tarea['nombre']}</div>
        </div>
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">Descripción: </div>
          <div className="flex-grow"> {tarea['descripcion']}</div>
        </div>
        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">Colaborador: </div>
          <div className="flex-grow">{tarea['colaborador'] ?
            (<b className="font-normal">{tarea['colaborador'].nombre} {tarea['colaborador'].apellido}</b>) :
            (<span className="font-normal">No asignado</span>)}</div>
        </div>

        <div className='task-row my-1 flex'>
          <div className="w-40 font-semibold">Estado tarea: </div>
          <div className="flex-grow"> {tarea['estado']}</div>
        </div>
      </div>

    </div>
  )
}
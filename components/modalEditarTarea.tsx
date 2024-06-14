import { useEffect, useState } from 'react';
import styles from './modalCrearProyecto.module.css';
import { proyectosAxios } from "@/api/axios";

const ModalEditarTarea = ({ isOpen, onClose, editarDatos, tarea, idProyecto, children }: { isOpen: boolean; onClose: () => void; editarDatos: (datos: any, tarea: any) => void; tarea: any; idProyecto: any; children: any }) => {

    const diccionarioEstado: any = {
        "Nuevo": "NUEVO",
        "En progreso": "EN_PROGRESO",
        "Cerrado": "CERRADO",
        "Bloqueado": "BLOQUEADO",
    }

    const diccionarioPrioridad: any = {
        "Alta": "ALTA",
        "Media": "MEDIA",
        "Baja": "BAJA",
    }

    const [recursos, setRecursos] = useState([]);
    const [id, setId] = useState(tarea['id']);
    const [nombre, setNombre] = useState(tarea['nombre']);
    const [descripcion, setDescripcion] = useState(tarea['descripcion']);
    const [fechaIni, setFechaIni] = useState(tarea['fechaCreacion']);
    const [estado, setEstado] = useState(diccionarioEstado[tarea['estado']]);
    const [prioridad, setPrioridad] = useState(diccionarioPrioridad [tarea['prioridad']]);
    const [tecnico, setTecnico] = useState(tarea['colaborador'] === null ? null : tarea['colaborador']['id']);
    //const [horasCalculadas, setHorasCalculadas] = useState(tarea['horasCalculadas']);


    // Consulto los recursos disponibles para asignar a las tareas
    useEffect(() => {
        proyectosAxios.get('/colaboradores')
            .then(response => {
                setRecursos(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (

        <div className={styles.modalContainer} style={{ display: isOpen ? 'grid' : 'none' }}>
            <div className={styles.modalBody}>

                <div className='flex flex-row-reverse'>
                    <button
                        onClick={onClose}
                        type="button" className="flex flex-row-reverse text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center  items-center me-2 dark:bg-red-600 dark:hover:bg-bred-700 dark:focus:ring-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </button>
                </div>

                <h1 className='text-3xl font-bold decoration-gray-400 text-white'>Editar Tarea</h1>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID:</label>
                    <input
                        disabled={true}
                        onChange={(event) => { setNombre(event.target.value); }}
                        value={id}
                        type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese Nombre de la tarea" />
                </div><br />


                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                    <input
                        onChange={(event) => { setNombre(event.target.value); }}
                        value={nombre}
                        type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese Nombre de la tarea" required />
                </div><br />

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(event) => { setDescripcion(event.target.value); }}
                        id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese una descripción de la tarea..."></textarea>
                </div><br />

             
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Responsable de la Tarea:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            value={tecnico}

                            onChange={(event) => { setTecnico(event.target.value) }}>
                            <option value={tarea['colaborador'] == null ? null : tarea['colaborador']['id']}>...</option>
                            {
                                recursos.map((recurso) => (
                                    <option key={recurso['id']} value={recurso['id']}>{recurso['nombre']} {recurso['apellido']}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            value={estado}
                            onChange={(event) => { setEstado(event.target.value) }}>
                            <option value="NUEVO">NUEVO</option>
                            <option value="EN_PROGRESO">EN PROGRESO</option>
                            <option value="BLOQUEADO">BLOQUEADO</option>
                            <option value="CERRADO">CERRADO</option> 
                        </select>
                    </div>


                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prioridad:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            value={prioridad}
                            onChange={(event) => {setPrioridad(event.target.value) }}>
                            <option value="ALTA">ALTA</option>
                            <option value="MEDIA">MEDIA</option>
                            <option value="BAJA">BAJA</option>
                        </select>
                    </div>

                </div><br />


                <div className='flex flex-row-reverse gap-10'>
                    <button
                        onClick={() => {
                            editarDatos({ id: id, nombre: nombre, descripcion: descripcion, estado: estado, prioridad: prioridad, fechaCreacion: fechaIni, colaboradorId: tecnico, proyectoId: idProyecto }, tarea = id);
                            onClose()
                        }}
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        Guardar
                    </button>

                    <button
                        onClick={onClose}
                        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Cancelar
                    </button>
                </div>




            </div>
        </div>


    );
}

export default ModalEditarTarea;
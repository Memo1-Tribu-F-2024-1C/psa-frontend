import { useEffect, useState } from 'react';
import styles from './modalCrearProyecto.module.css';
import { soportesAxios, proyectosAxios } from "@/api/axios";
import Select, {StylesConfig} from "react-select";
import { Tarea } from "@/types/types"
import ModalCrearTareaDesdeTicket from "@/components/modalCrearTareaDesdeTicket";

const ModalCrearTicket = ({ isOpen, onClose, guardarDatos, codigoProducto, codigoVersion, children }: { isOpen: boolean; onClose: () => void; guardarDatos: (datos: any) => void; codigoProducto: number; codigoVersion: number; children: any }) => {

    const [recursos, setRecursos] = useState([]);
    const [options, setOptions] = useState([] as { value: number, label: string }[]);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("Nuevo");
    const [severidad, setSeveridad] = useState("S1");
    const [deadline, setDeadline] = useState('');
    const [cliente, setCliente] = useState('');
    const [tareas, setTareas] = useState([] as Tarea[]);
    const [tareasSeleccionadas, setTareasSeleccionadas] = useState([]);
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [crearTareaModal, setCrearTareaModal] = useState(false);
    const [colaboradores, setColaboradores] = useState([]);
    const [proytectos, setProyectos] = useState([]);

    useEffect(() => { 
        soportesAxios.get('/clientes')
            .then(response => {
                setRecursos(response.data);
            })
            .catch(error => {
                console.error(error);
            }); ``
    }, []);
    
    const obtenerTareas = () => {
        proyectosAxios.get('/tareas')
            .then(response => {
                setTareas(response.data);
            })
            .catch(error => {
                console.error(error);
            }); 
    }

    useEffect(() => {
``
    }, []);

    useEffect(() => {
        if (!crearTareaModal) { // Solo cargamos las tareas nuevamente si el modal de crear tarea se ha cerrado
            proyectosAxios.get('/tareas')
                .then(response => {
                    setTareas(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [crearTareaModal]); 

    useEffect(() => {
        proyectosAxios.get('/colaboradores')
            .then(response => {
                setColaboradores(response.data);
            })
            .catch(error => {
                console.error(error);
            }); ``
    }, []);

    useEffect(() => {
        const formattedDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        });
        setFechaCreacion(formattedDate);
      }, []);

    useEffect(() => {
        const opt = tareas
        .filter(tarea => tarea.estado != "Cerrado")
        .map(t => {
            return {
                value: t['id'], label: t['nombre']
            }
        }) 

        setOptions(opt)
    }, [tareas])
     

    const handlerTareasSeleccionadas = (options: any) => {
        const values = options.map((o: any) => o.value) 
        setTareasSeleccionadas(values)
    }

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
                <h1 className='text-3xl font-bold decoration-gray-400'>Crear Ticket</h1>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />


                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo:</label>
                    <input
                        onChange={(event) => { setTitulo(event.target.value); }}
                        type="text" id="first_name" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese titulo del ticket" required />
                </div><br />

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción:</label>
                    <textarea
                        onChange={(event) => { setDescripcion(event.target.value); }}
                        id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese una descripción del ticket..."></textarea>
                </div><br />

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' >
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' id='inputGroup-sizing-defualt'>Fecha de fin estimada:</label>
                    <input
                        onChange={(event) => { setDeadline(event.target.value) }}
                        type='date' className='datepicker bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    <div className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' >
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' id='inputGroup-sizing-defualt'>Tareas:</label>
                        <Select isMulti unstyled options={options} onChange={(selectedOptions) => {
                            handlerTareasSeleccionadas(selectedOptions)
                        }} classNames={{
                            control: () => 
                            "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ,
                            option: () => 
                            "block p-2.5 w-full text-sm text-gray-900 bg-gray-100 border border-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            
                        } as any}
                            />
                    </div>
                </div><br />

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cliente del ticket:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            onChange={(event) => { setCliente(event.target.value) }}>
                            <option value="null">No asignado</option>
                            {
                                recursos.map((recursos) => (
                                    <option key={recursos['id']} value={recursos['CUIT']}> {recursos['razon social']} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            onChange={(event) => { setEstado(event.target.value) }}>

                        <option value="Nuevo">Nuevo</option>
                        <option value="Progreso">Progreso</option>
                        <option value="Esperando desarrollo">Esperando desarrollo</option>
                        <option value="Esperando Cliente">Esperando cliente</option>
                        <option value="Resuelto esperando confirmacion">Resuelto esperando confirmacion</option>
                        <option value="Cerrado">Cerrado</option>
                        <option value="Cerrado">Bloqueado</option>
                                
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Severidad:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            onChange={(event) => { setSeveridad(event.target.value) }}>

                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                            <option value="S4">S4</option>

                        </select>
                    </div>
                    <div className="mb-4 flex justify-center">
                       <button
                         onClick={() => setCrearTareaModal(true)}
                         className="inline-flex items-center px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                         Crear Tarea
                       </button>
                       <ModalCrearTareaDesdeTicket colaboradores={colaboradores} isOpen={crearTareaModal} onClose={() => {
                        setCrearTareaModal(false)
                        obtenerTareas()
                        }}>
                         <button onClick={() => setCrearTareaModal(false)}>asdfs</button>
                       </ModalCrearTareaDesdeTicket>
                     </div>
                </div><br />
            </div><br />
            <div className='flex flex-row-reverse gap-10'>
                <button
                    onClick={() => {
                        guardarDatos({ titulo: titulo, descripcion: descripcion, severidad: severidad, estado: estado, fechaLimite: deadline, cuitCliente: cliente, codigoVersion: codigoVersion, idTareas: tareasSeleccionadas});
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
    );
}

export default ModalCrearTicket;
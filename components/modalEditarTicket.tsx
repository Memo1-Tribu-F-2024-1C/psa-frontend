import { useEffect, useState } from 'react';
import styles from './modalCrearProyecto.module.css';
import { soportesAxios } from "@/api/axios";

const ModalEditarTicket = ({ isOpen, onClose, editarDatos, ticket, children }: { isOpen: boolean; onClose: () => void; guardarDatos: (datos: any) => void; idProyecto: any; children: any }) => {

    const [recursos, setRecursos] = useState([]);
    const [descripcion, setDescripcion] = useState(ticket["descripcion"]);
    const [estado, setEstado] = useState(ticket["estado"]);
    const [severidad, setSeveridad] = useState(ticket["severidad"]);
    const [deadline, setDeadline] = useState(ticket["deadline"]);
    const [cliente, setCliente] = useState(ticket['cliente'] === null ? null : ticket['cliente']['id']);

    useEffect(() => {
        soportesAxios.get('/soporte/clientes')
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
                <h1 className='text-3xl font-bold decoration-gray-400'>Crear Ticket</h1>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />


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
                </div><br />


                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colaborador en tarea:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            onChange={(event) => { setCliente(event.target.value) }}>
                            <option value="null">No asignado</option>
                            {
                                recursos.map((recurso) => (
                                    <option key={recurso['id']} value={recurso['id']}>{recurso['razon_social']} {recurso['cuit']}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            onChange={(event) => { setEstado(event.target.value) }}>

                        <option value="Nuevo">NUEVO</option>
                        <option value="Progreso">EN PROGRESO</option>
                        <option value="Esperando Desarrollo">ESPERANDO DESARROLLO</option>
                        <option value="Esperando Cliente">ESPERANDO CLIENTE</option>
                        <option value="Resuelto esperando confirmacion">RESUELTO ESPERANDO CONFIRMACION</option>
                        <option value="Cerrado">CERRADO</option>
                        <option value="Cerrado">BLOQUEADO</option>
                                
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prioridad:</label>
                        <select className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="inputGroupSelect01"
                            onChange={(event) => { setSeveridad(event.target.value) }}>

                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                            <option value="S4">S4</option>

                        </select>
                    </div>
                </div><br />

            </div><br />
            <div className='flex flex-row-reverse gap-10'>
                <button
                    onClick={() => {
                        editarDatos({ numero: ticket["numero"], descripcion: descripcion, estado: estado, severidad: severidad, deadline: deadline, clienteId: ticket["cliente"], idProducto: ticket["idProducto"], idVersion: ["idVersion"]});
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

export default ModalEditarTicket;
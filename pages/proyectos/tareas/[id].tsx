import {useEffect, useState} from "react";
import  TareaGridRow  from "@/components/tareaGridRow";
import MostrarProyecto from "@/components/mostrarProyecto";
import { Proyecto } from "@/types/types";
import { useRouter } from 'next/router';
import ModalCrearTarea from "@/components/modalCrearTarea";
import { Cantora_One } from "next/font/google";
import KanbanBoard from '@/components/kanban/tablero';
import { proyectosAxios } from "@/api/axios";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Tareas({id}:{id:any}) {
    const [tareas, setTareas] = useState([]);
    const [proyecto, setProyecto] = useState([]);
    const [datos, setDatos] = useState({});

    const router = useRouter();
    const [textFilter,setTextFilter] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
    const [crearTareaModal, setCrearTareaModal] = useState(false);       

 
    const guardarDatos = (datos: any) => {
        proyectosAxios.post('/tarea', datos)
          .then(response => {
            setDatos(response.data);
            window.location.reload();
          })
          .catch(error => {
            console.error(error);
          });
      }
    
  

    useEffect(() => {
        proyectosAxios.get(`/proyecto/${id}`)
          .then(response => {
            console.log(response.data)
            setProyecto(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    
   

    useEffect(() => {
        proyectosAxios.get(`/proyecto/${id}/tareas`)
          .then(response => {
            console.log(response.data)
            setTareas(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    const tareasProyecto = tareas;
    const tareasFiltradas = tareasProyecto.filter((objeto : any) => objeto['nombre'].toLowerCase().includes(textFilter.toLowerCase()));
    const tareasSelects = (estadoSeleccionado === 'Todos' ) ? tareasFiltradas : tareasFiltradas.filter((objeto : any) => (objeto.estado === estadoSeleccionado)); 

    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}

            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-black decoration-gray-400">Proyecto: {id} </h1>
                    <h1 className="text-3xl font-bold text-black decoration-gray-400">Listado de Tareas</h1>
                    <br/>
                    <hr/>
                </div>

                /*<MostrarProyecto proyecto={proyecto}  Tareas={tareasProyecto}/>*/


                <div className="mb-4">
                    <button 
                    onClick={()=> setCrearTareaModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                	        Crear Tarea
                    </button>
                    <ModalCrearTarea isOpen={ crearTareaModal } onClose={ () => setCrearTareaModal(false) } guardarDatos= {guardarDatos} idProyecto={id}>
                        <button onClick={() => setCrearTareaModal(false)}>Guardar</button>
                    </ModalCrearTarea>
                </div>

                <div className='space-x-4 '>
                   <label className="text-l font-bold text-black decoration-gray-400" >Filtrar por estado: </label>
                    <select  className='text-gray-600 border border-gray-300 rounded outline-infigo-700 ' onChange={(e) => setEstadoSeleccionado(e.target.value)}>
                        <option value="Todos">Todos</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="En curso">En curso</option>
                        <option value="Bloqueado">Bloqueado</option>
                        <option value="Cerrado">Cerrado</option>                
                    </select>
                            
                    
                    <label className="text-l font-bold text-black decoration-gray-400" >Filtrar tarea por nombre de tarea: </label>
                    <input
                    onChange={(e)=>(setTextFilter(e.target.value) )}
                    type='text'
                    className='text-gray-600 border border-gray-300 rounded outline-infigo-700'
                    placeholder="Buscar..."/>
                </div>
      

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead >
                                <tr >
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Nombre" />
                                    <HeaderItem title="Colaborador" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title="Fecha de Inicio" />
                                    <HeaderItem title="Acciones" />
                                </tr>
                                </thead>

                                <tbody className="text-black">                                
                                {tareasSelects.map((tarea) => (
                                    <TareaGridRow key={tarea['id']} tarea={tarea} idProyecto={id} />
                                ))}    


                                </tbody>
                            </table>
                        </div>
                         </div>
                        <KanbanBoard tasks={tareasProyecto}/>
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps = async (context: any) => {
    const { id } = context.query;
    
    return {
      props: {
        id,
      },
    };
  };

import { useEffect, useState } from "react";
import TareaGridRow from "@/components/tareaGridRow";
import MostrarProyecto from "@/components/mostrarProyecto";
import { useRouter } from 'next/router';
import ModalCrearTarea from "@/components/modalCrearTarea";
import { proyectosAxios } from "@/api/axios";

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''} border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function Tareas({ id }: { id: any }) {
  const [tareas, setTareas] = useState([]);
  const [proyecto, setProyecto] = useState([]);
  const [datos, setDatos] = useState({});
  const [colaboradores, setColaboradores] = useState([])

  const router = useRouter();
  const [textFilter, setTextFilter] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState('Todas');
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
  };

  const obtenerProyecto = () => {
    proyectosAxios.get(`/proyecto/${id}`)
      .then(response => {
        setProyecto(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const obtenerTareas = () => {
    proyectosAxios.get(`/proyecto/${id}/tareas`)
      .then(response => {
        setTareas(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const obtenerColaboradores = () => {
    proyectosAxios.get('/colaboradores')
      .then(response => {
        setColaboradores(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    obtenerProyecto();
    obtenerTareas();
    obtenerColaboradores();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const tareasFiltradas = tareas
    .filter((tarea: any) => tarea['nombre'].toLowerCase().includes(textFilter.toLowerCase()))
    .filter((tarea: any) => estadoSeleccionado === 'Todos' || tarea.estado === estadoSeleccionado)
    .filter((tarea: any) => prioridadSeleccionada === 'Todas' || tarea.prioridad === prioridadSeleccionada);

  console.log(tareasFiltradas);
  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          {/* @ts-ignore */}
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Proyecto: {proyecto.nombre} </h1>
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Listado de Tareas</h1>
          <br />
          <hr />
        </div>

        <MostrarProyecto proyecto={proyecto} Tareas={tareas} />

        <div className="mb-4">
          <button
            onClick={() => setCrearTareaModal(true)}
            className="inline-flex items-center px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Crear Tarea
          </button>
          <ModalCrearTarea colaboradores={colaboradores} isOpen={crearTareaModal} onClose={() => setCrearTareaModal(false)} guardarDatos={guardarDatos} idProyecto={id}>
            <button onClick={() => setCrearTareaModal(false)}>Guardar</button>
          </ModalCrearTarea>
        </div>

        <div className='space-x-4 my-5'>
          <label className="text-l font-bold text-gray-300 decoration-gray-400">Filtrar por estado: </label>
          <select className='text-gray-600 border border-gray-300 rounded outline-infigo-700' onChange={(e) => setEstadoSeleccionado(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Nuevo">Nuevo</option>
            <option value="En progreso">En progreso</option>
            <option value="Bloqueado">Bloqueado</option>
            <option value="Cerrado">Cerrado</option>
          </select>

          <label className="text-l font-bold text-gray-300 decoration-gray-400">Filtrar por prioridad: </label>
          <select className='text-gray-600 border border-gray-300 rounded outline-infigo-700' onChange={(e) => setPrioridadSeleccionada(e.target.value)}>
            <option value="Todas">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>

          <label className="text-l font-bold text-gray-300 decoration-gray-400">Filtrar tarea por nombre de tarea: </label>
          <input
            onChange={(e) => setTextFilter(e.target.value)}
            type='text'
            className='text-gray-600 border border-gray-300 rounded outline-infigo-700'
            placeholder="Buscar..."
          />
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="text-center">
                    <HeaderItem title="ID" />
                    <HeaderItem title="Nombre" />
                    <HeaderItem title="Colaborador" />
                    <HeaderItem title="Estado" />
                    <HeaderItem title="Prioridad" />
                    <HeaderItem title="Fecha de Inicio" />
                    <HeaderItem title="Acciones" isJustify={true} />
                  </tr>
                </thead>
                <tbody>
                  {tareasFiltradas.map((tarea) => (
                    <TareaGridRow key={tarea['id']} tarea={tarea} idProyecto={id} colaboradores={colaboradores} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

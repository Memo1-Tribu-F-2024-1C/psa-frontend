import { Proyecto } from "@/types/types";
import { proyectosAxios } from "@/api/axios";
import { useEffect, useState } from "react";
import ModalCrearProyecto from "@/components/modalCrearProyecto";
import ProyectoGridRow from "@/components/proyectoGridRow";

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''}  border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function Proyectos() {

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [crearProyectoModal, setCrearProyectoModal] = useState(false);
  const [recursos, setRecursos] = useState([]);
  const [datos, setDatos] = useState({});

  const guardarDatos = (datos: any) => {
    proyectosAxios.post('/proyecto', datos)
      .then(response => {
        setDatos(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }

  const obtenerProyectos = () => {
    proyectosAxios.get('/proyectos')
      .then(response => {
        console.log(response.data)
        setProyectos(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    proyectos.sort((a, b) => a['id'] - b['id'])
  }

  const obtenerRecursos = () => {
    proyectosAxios.get('/recursos')
      .then(response => {
        setRecursos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }


  useEffect(() => {
    obtenerProyectos();
    obtenerRecursos();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold decoration-gray-400 text-gray-200">Proyectos</h1>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setCrearProyectoModal(true)}
            className="inline-flex items-center px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Crear Proyecto
          </button>
          <ModalCrearProyecto recursos={recursos} isOpen={crearProyectoModal} onClose={() => setCrearProyectoModal(false)} guardarDatos={guardarDatos}>
            <button onClick={() => setCrearProyectoModal(false)}>Guardar</button>
          </ModalCrearProyecto>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 sm:rounded-lg">
              <table className="min-w-full ">
                <thead>
                  <tr className="text-center ">
                    <HeaderItem title="ID" />
                    <HeaderItem title="Nombre" />
                    <HeaderItem title="Líder" />
                    <HeaderItem title="Fecha de inicio" />
                    <HeaderItem title="Fecha de fin estimada" />
                    <HeaderItem title="Estado" />
                    <HeaderItem title="Acciones" isJustify={true} />
                  </tr>
                </thead>

                <tbody>
                  {proyectos.map((proyecto) => (
                    <ProyectoGridRow key={proyecto['id']} proyecto={proyecto} recursos={recursos} />
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

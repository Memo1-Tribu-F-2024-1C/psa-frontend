import { Proyecto } from "@/types/types";
import { proyectosAxios } from "@/api/axios";
import { useEffect, useState } from "react";
import ModalCrearProyecto from "@/components/modalCrearProyecto";
import ProyectoGridRow from "@/components/proyectoGridRow";

function HeaderItem({ title, isBold }: { title: string, isBold?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-500'} border-b border-gray-200 bg-gray-50`}>
      {title}
    </th>
  );
}

export default function Proyectos() {

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [crearProyectoModal, setCrearProyectoModal] = useState(false);
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

  useEffect(() => {
    proyectosAxios.get('/proyectos')
      .then(response => {
        console.log(response.data)
        setProyectos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold decoration-gray-400 text-gray-900">Proyectos</h1>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setCrearProyectoModal(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Crear Proyecto
          </button>
          <ModalCrearProyecto isOpen={crearProyectoModal} onClose={() => setCrearProyectoModal(false)} guardarDatos={guardarDatos}>
            <button onClick={() => setCrearProyectoModal(false)}>Guardar</button>
          </ModalCrearProyecto>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <HeaderItem title="ID"  />
                    <HeaderItem title="Nombre"  />
                    <HeaderItem title="Lider" />
                    <HeaderItem title="Fecha de inicio" />
                    <HeaderItem title="Fecha de finalización" />
                    <HeaderItem title="Estado" />
                    <HeaderItem title="Acciones" />
                  </tr>
                </thead>

                <tbody>
                  {proyectos.map((proyecto) => (
                    <ProyectoGridRow key={proyecto['id']} proyecto={proyecto} />
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

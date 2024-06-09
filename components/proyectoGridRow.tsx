import { useState } from "react";
import { Proyecto } from "@/types/types";
import { useRouter } from 'next/router';
import FormatDate from "@/components/formatDate";
import IsLeaderNull from "@/components/isLiderNull";

export default function ProyectoGridRow({ proyecto }: { proyecto: Proyecto }) {

  const router = useRouter();

  const [modalEliminar, setModalEliminar] = useState({
    isOpen: false,
    todo: {}
  })

  const [editarProyectoModal, setEditarProyectoModal] = useState(false);
  const [datos, setDatos] = useState({});

  const BorrarProyecto = async (proyecto: any) => {
    console.log(proyecto.id)
    await fetch(`https://psa-backend-projectos.onrender.com/proyecto/${proyecto.id}`, { method: 'DELETE' });
    setModalEliminar({ isOpen: false, todo: {} });
    window.location.reload();
  }

  const editarDatos = async (data: any) => {
    setDatos(data);
    await fetch(`https://psa-backend-projectos.onrender.com/proyecto`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'Application/json' }
    });
    window.location.reload();
  }

  return (
    <tr key={`${proyecto['id']}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center text-gray-900">{proyecto['id']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center text-gray-900">{proyecto['nombre']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900"><IsLeaderNull lider={proyecto['lider']} /></div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{proyecto['estado']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900"><FormatDate dateString={proyecto['fechaCreacion']} /></div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900"><FormatDate dateString={proyecto['fechaFinalizacion']} /></div>
      </td>


      {/* Botones de Acciones */}
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">

        <button
          onClick={() => setEditarProyectoModal(true)}
          className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z" />
          </svg>
          Editar
        </button>
        {/* <ModalEditarProyecto isOpen={editarProyectoModal} onClose={() => setEditarProyectoModal(false)} editarDatos={editarDatos} proyecto={proyecto}>
          <button onClick={() => setEditarProyectoModal(false)}>Guardar</button>
        </ModalEditarProyecto> */}

        <button
          onClick={() => setModalEliminar({ isOpen: true, todo: {} })}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Borrar
        </button>

        {/* <ModalConfirmar isOpen={modalEliminar.isOpen} onClose={() => setModalEliminar({ isOpen: false, todo: {} })}>
          <div className='container'>
            <h1 className='text-3xl font-bold decoration-gray-400'>Eliminar Proyecto !</h1>
            <h1 className='text-2xl font-bold decoration-gray-400'>Desea eliminar el proyecto: <b className="text-blue-600">{proyecto['nombre']}</b>?</h1><br />
            <p>Al <b>Confirmar</b> se borrará el proyecto y todas sus tareas asociadas...</p><br />
            <div className='flex flex-row-reverse gap-10'>
              <button
                onClick={() => BorrarProyecto(proyecto)}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                Confirmar
              </button>
              <button
                onClick={() => setModalEliminar({ isOpen: false, todo: {} })}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cancelar
              </button>
            </div>
          </div>
        </ModalConfirmar> */}

        <button
          onClick={() => router.push({ pathname: `./proyectos/tareas/${proyecto['id']}` })}
          className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Ver
        </button>
      </td>

    </tr>
  )
}
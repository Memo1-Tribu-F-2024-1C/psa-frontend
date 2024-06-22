import { useState } from "react";
import { Ticket } from "@/types/types";
import { useRouter } from 'next/router';
import { proyectosAxios } from "@/api/axios";
import FormatDate from "@/components/formatDate";

export default function TicketGridRow({ ticket }: { ticket: Ticket }) {

  const router = useRouter();

  const [modalEliminar, setModalEliminar] = useState({
    isOpen: false,
    todo: {}
  })

  const [editarProyectoModal, setEditarProyectoModal] = useState(false);
  const [datos, setDatos] = useState({});


  const BorrarProyecto = async (proyecto: any) => {
    console.log(proyecto.id);
    proyectosAxios.delete(`proyecto/${proyecto.id}`)
      .then(response => {
        console.log('Response:', response); 
        setModalEliminar({ isOpen: false, todo: {} });
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error); 
      });
  };

const editarDatos = (datos: any) => {
  proyectosAxios.put('/proyecto', datos)
    .then(response => {
      setDatos(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
    });
}


  return (
    <tr key={`${ticket['id']}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-m flex items-center text-gray-200">{ticket['id'] + 3672}</div>
      </td>

      <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{ticket['titulo']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className=" text-m flex items-center text-gray-200">{ticket['descripcion']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        {/* <div className="text-m leading-5 text-gray-200"><FormatDate dateString={ticket['fechaCreacion']} /></div> */}
        <div className="text-m leading-5 text-gray-200">{ticket['fechaCreacion']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        {/* <div className="text-m leading-5 text-gray-200"><FormatDate dateString={ticket['deadline']} /></div> */}
        <div className="text-m leading-5 text-gray-200">{ticket['deadline']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{ticket['idCliente']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{ticket['idProducto']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{ticket['idVersion']}</div>
      </td>

      {/* Botones de Acciones */}
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">

        <button
          className="inline-flex items-center mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z" />
          </svg>
          Editar
        </button>

        <button
          onClick={() => router.push({ pathname: `./tickets/${ticket['id']}` })}
          className="inline-flex items-center mr-2 mt-1 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Ver
        </button>

        <button
          className="inline-flex items-center mt-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Borrar
        </button>

        
      </td>

    </tr>
  )
}
import { useState } from "react";
import { VersionProducto } from "@/types/types";
import { useRouter } from 'next/router';
import { proyectosAxios } from "@/api/axios";
import FormatDate from "@/components/formatDate";
import ModalCrearTicket from "./modalCrearTicket";
import { soportesAxios } from "@/api/axios";

export default function VersionProductoGridRow({ version, codigoProducto }: {  version: VersionProducto, codigoProducto: number }) {

  const router = useRouter();

  const [modalEliminar, setModalEliminar] = useState({
    isOpen: false,
    todo: {}
  })

  const [crearTicketModal, setCrearTicketModal] = useState(false)

  const [datos, setDatos] = useState({})
  const guardarDatos = (datos: any) => {
      soportesAxios.post('/tickets', datos)
        .then(response => {
          setDatos(response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    }
  const BorrarProyecto = async (proyecto: any) => {
    console.log(proyecto.id);
    proyectosAxios.delete(`proyecto/${proyecto.id}`)
      .then(response => {
        setModalEliminar({ isOpen: false, todo: {} });
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error); 
      });
  };

const editarDatos = (datos: any) => {
  proyectosAxios.put('/versiones', datos)
    .then(response => {
      setDatos(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
    });
}


  return (
    <tr key={`${version.codigo}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-m flex items-center text-gray-200">{version.nombre}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className=" text-m flex items-center text-gray-200">{version.fechaCreacion}</div>
      </td>

      {/* Botones de Acciones */}
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">

        <button
          onClick={() => setCrearTicketModal(true)}
          className="inline-flex items-center mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z" />
          </svg>
          Crear Ticket
        </button>
        { <ModalCrearTicket isOpen={crearTicketModal} onClose={() => setCrearTicketModal(false)} guardarDatos={guardarDatos} codigoProducto={codigoProducto} codigoVersion={version.codigo}>
          <button onClick={() => setCrearTicketModal(false)}>Guardar</button>
        </ModalCrearTicket> }
        
        <button
          onClick={() => router.push(
            { 
              pathname: `./soporte/tickets`, 
              query: { version: version.codigo } 
            })}
          className="inline-flex items-center mr-2 mt-1 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Ver tickets asociados
        </button>

        
      </td>

    </tr>
  )
}
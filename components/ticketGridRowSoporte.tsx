import { useEffect,useState } from "react";
import { Ticket } from "@/types/types";
import {Cliente} from "@/types/types";
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import { soportesAxios } from "@/api/axios";
import FormatDate from "@/components/formatDate";
import ModalEditarTicket from "./modalEditarTicket";
import ModalConfirmar from "./modalConfirmar";

export default function TicketGridRowSoporte({ ticket }: { ticket: Ticket}) {

  const router = useRouter();
  const searchParams = useSearchParams()
  const codigoVersion: any = searchParams.get('version')
  const codigoProducto = searchParams.get('producto')

  const [modalEliminar, setModalEliminar] = useState({
    isOpen: false,
    todo: {}
  })

  const [editarTicketModal, setEditarTicketModal] = useState(false);
  const [datos, setDatos] = useState({});
  const [clientes, setClientes] = useState([] as Cliente[])


  const BorrarTicket = async (ticket: any) => {
    console.log(ticket.numeroTicket);
    soportesAxios.delete(`/tickets/${ticket.numeroTicket}`)
      .then(response => {
        console.log('Response:', response); 
        setModalEliminar({ isOpen: false, todo: {} });
        window.location.reload() 
      })
      .catch(error => {
        console.error('Error:', error); 
      });
  };

  const editarDatos = (datos: any) => {
    soportesAxios.put(`/tickets/${ticket.numeroTicket}`, datos)
      .then(response => {
        setDatos(response.data);
        router.push({
          pathname: `./tickets`,
          query: {version: codigoVersion, producto: codigoProducto}
        })
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => { 
    soportesAxios.get('/clientes')
        .then(response => {
            setClientes(response.data);
        })
        .catch(error => {
            console.error(error);
        }); ``
  }, []);

  const cliente = clientes.find(cliente => cliente.CUIT === ticket.cuitCliente);
  const razonSocial = cliente ? cliente['razon social'] : 'Cliente no encontrado'

  return (
    <tr key={`${ticket.numeroTicket}`}>
      <td className="px-4 py-4 justify-center whitespace-no-wrap border-b border-gray-200">
        <div className="text-m flex justify-center items-center text-gray-200">{ticket.numeroTicket}</div>
      </td>

      <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex justify-center items-center text-gray-200">{ticket['titulo']}</div>
      </td>

      <td className="px-2 py-2 justify-center whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex justify-center items-center text-gray-200">{ticket['estado']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex justify-center items-center text-gray-200">{ticket['severidad']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-m flex justify-center items-center leading-5 text-gray-200">{ticket['fechaDeCreacion']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-m flex justify-center items-center leading-5 text-gray-200">{ticket['fechaLimite']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex justify-center items-center text-gray-200">{razonSocial}</div>
      </td>

      {/* Botones de Acciones */}
      <td className="px-3 py-6 whitespace-no-wrap border-b border-gray-200">
        <div className="flex justify-arount">
          <button
              onClick={() => setEditarTicketModal(true)}
              className="inline-flex items-center mr-1.5 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-m font-medium rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z" />
              </svg>
              Editar
          </button>
          <ModalEditarTicket isOpen={editarTicketModal} onClose={() => setEditarTicketModal(false)} editarDatos={editarDatos} ticket={ticket}>
              <button onClick={() => setEditarTicketModal(false)}>Guardar</button>
          </ModalEditarTicket>

          <button
            onClick={() => router.push({ pathname: `./tickets/${ticket.numeroTicket}` })}
            className="inline-flex items-center mr-1.5 px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
              Ver
          </button>

          <button
              onClick={() => setModalEliminar({ isOpen: true, todo: {} })}
              className="inline-flex items-center px-2 py-2 bg-red-600 hover:bg-red-700 text-white text-m font-medium rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Borrar
          </button>
        </div>
                <ModalConfirmar isOpen={modalEliminar.isOpen} onClose={() => setModalEliminar({ isOpen: false, todo: {} })}>
                    <div className='container text-white'>
                        <h1 className='text-3xl font-bold decoration-gray-400'>¡Borrar Ticket!</h1>
                        <h1 className='text-2xl font-bold decoration-gray-400'>Desea borrar el Ticket: <b className="text-blue-600">{ticket['titulo']}</b>?</h1>
                        <h1 className='text-2xl font-bold decoration-gray-400'>ID: <b className="text-blue-600">{ticket['numeroTicket']}</b></h1><br />
                        <p><b>Atención</b> se borrará el ticket</p><br />
                        <div className='flex flex-row-reverse gap-10'>
                            <button
                                onClick={() => BorrarTicket(ticket)}
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
                </ModalConfirmar>
        
      </td>

    </tr>
  )
}
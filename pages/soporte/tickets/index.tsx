import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { soportesAxios } from "@/api/axios";
import TicketGridRowSoporte from "@/components/ticketGridRowSoporte";
import { useSearchParams } from 'next/navigation'
import { Ticket } from "@/types/types";
import styles from '@/components/tickets.module.css';

import Link from 'next/link'

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''} border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function Tickets() {
  const searchParams = useSearchParams()
  
  const codigoVersion: any = searchParams.get('version')
  const codigoProducto = searchParams.get('producto')

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const router = useRouter();
  const [textFilter, setTextFilter] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState('Todos');
  const [versionSeleccionada, setVersionSeleccionada] = useState('Todas');
  const [severidadSeleccionada, setSeveridadSeleccionada] = useState('Todas');
  const [clienteSeleccionado, setClienteSeleccionado] = useState('Todas');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await soportesAxios.get(`versiones/${codigoVersion}/tickets`);
        setTickets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (codigoVersion && codigoProducto) {
      fetchData();
    }
  }, [codigoVersion, codigoProducto]);

  const ticketsFiltrados = tickets;
    // .filter((ticket: any) => ticket.idVersion == version);

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <button
            onClick={() => router.push(
              { 
                pathname: `./`, 
                query: { producto: codigoProducto } 
              })}
            className="inline-flex items-center mr-2 mt-1 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            
          </button>
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Listado de Tickets</h1>
          <br />
          <hr />
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
              <table>
                <thead>
                  <tr className={`text-center ${styles.tableHeader}`}>
                    <th className={`text-center${styles.colTicket}`} >Nro de Ticket</th>
                    <th className={styles.colTitle}>Titulo</th>
                    <th className={`w-100${styles.colStatus}`}>Estado</th>
                    <th className={styles.colSeverity}>Severidad</th>
                    <th className={styles.colCreation}>Fecha de Creación</th>
                    <th className={styles.colDeadline}>Tiempo Límite</th>
                    <th className={styles.colClient}>Cliente</th>
                    <th className={styles.colActions}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketsFiltrados.map((ticket) => (
                    <TicketGridRowSoporte key={ticket.numeroTicket} ticket={ticket}/>
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

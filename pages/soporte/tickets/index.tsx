import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { soportesAxios } from "@/api/axios";
import TicketGridRow from "@/components/ticketGridRow";
import { useSearchParams } from 'next/navigation'
import { Ticket } from "@/types/types";

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''} border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function Tickets() {
  const searchParams = useSearchParams()
  
  const version = searchParams.get('version')

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const router = useRouter();
  const [textFilter, setTextFilter] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState('Todos');
  const [versionSeleccionada, setVersionSeleccionada] = useState('Todas');
  const [severidadSeleccionada, setSeveridadSeleccionada] = useState('Todas');
  const [clienteSeleccionado, setClienteSeleccionado] = useState('Todas');

  useEffect(() => {
    soportesAxios.get(`versiones/${version}/tickets`)
      .then(response => {
        console.log(response.data);
        setTickets(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const ticketsFiltrados = tickets;
    // .filter((ticket: any) => ticket.idVersion == version);

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Listado de Tickets</h1>
          <br />
          <hr />
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="text-center">
                    <HeaderItem title="Nro de Ticket" />
                    <HeaderItem title="Titulo" />
                    <HeaderItem title="Estado" />
                    <HeaderItem title="Severidad" />
                    <HeaderItem title="Fecha de Creación" />
                    <HeaderItem title="Tiempo Límite" />
                    <HeaderItem title="Cliente" /> 
                    <HeaderItem title="Acciones" isJustify={true} />
                  </tr>
                </thead>
                <tbody>
                  {ticketsFiltrados.map((ticket) => (
                    <TicketGridRow key={ticket.numeroTicket} ticket={ticket} />
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

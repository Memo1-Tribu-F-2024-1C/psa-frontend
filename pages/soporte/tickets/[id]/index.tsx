import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { soportesAxios } from "@/api/axios";
import TicketGridRow from "@/components/ticketGridRow";

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''} border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function TicketDetail({ params }: { params: { id: string } }) {
  
  const [tickets, setTickets] = useState([]);
  const [datos, setDatos] = useState({});

  const router = useRouter();
  const ticket = {
    id: router.query.id,
    titulo: "sfs3dsf",
    descripcion: "afe3rarg",
    estado: "Sgersg3",
    severidad: "DERGER3G",
    fechaCreacion: "02112019",
    deadline: "02112019",
    idProducto: "2",
    idVersion: "1.2",
    idCliente: 2
  }
  const [textFilter, setTextFilter] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState('Todos');
  const [versionSeleccionada, setVersionSeleccionada] = useState('Todas');
  const [severidadSeleccionada, setSeveridadSeleccionada] = useState('Todas');
  const [clienteSeleccionado, setClienteSeleccionado] = useState('Todas');

  useEffect(() => {
    soportesAxios.get(`/soporte/tickets/${router.query.id}`)
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Ticket {ticket.id}</h1>
          <br />
          <hr />
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
              id: {ticket.id}<br/>
              titulo: {ticket.titulo}<br/>
              descripcion: {ticket.descripcion}<br/>
              estado: {ticket.estado}<br/>
              severidad: {ticket.severidad}<br/>
              fechaCreacion: {ticket.fechaCreacion}<br/>
              deadline: {ticket.deadline}<br/>
              idProducto: {ticket.idProducto}<br/>
              idVersion: {ticket.idVersion}<br/>
              idCliente: {ticket.idCliente}<br/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

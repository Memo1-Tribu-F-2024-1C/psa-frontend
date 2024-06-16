import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { soportesAxios } from "@/api/axios";

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''} border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [datos, setDatos] = useState({});

  const router = useRouter();
  const [textFilter, setTextFilter] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState('Todos');
  const [versionSeleccionada, setVersionSeleccionada] = useState('Todas');
  const [severidadSeleccionada, setSeveridadSeleccionada] = useState('Todas');
  const [clienteSeleccionado, setClienteSeleccionado] = useState('Todas');

  const guardarDatos = (datos: any) => {
    // Guardar nuevo ticket
  };

  useEffect(() => {
    soportesAxios.get(`/soporte/tickets`)
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

//   const ticketsFiltrados = tickets
//     .filter((ticket: any) => [FILTRO])
//     .filter((ticket: any) => [FILTRO])
//     .filter((ticket: any) => [FILTRO])
//     .filter((ticket: any) => [FILTRO])
//     .filter((ticket: any) => [FILTRO]);

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Listado de Tickets</h1>
          <br />
          <hr />
        </div>

        <label className="text-l font-bold text-gray-300 decoration-gray-400">Filtrar por Estado: </label>
          <select className='text-gray-600 border border-gray-300 rounded outline-infigo-700' onChange={(e) => setEstadoSeleccionado(e.target.value)}>
            <option value="Todas">Todos</option>
          </select>

        <div className='space-x-4 my-5'>
          <label className="text-l font-bold text-gray-300 decoration-gray-400">Filtrar por Producto: </label>
          <select className='text-gray-600 border border-gray-300 rounded outline-infigo-700' onChange={(e) => setProductoSeleccionado(e.target.value)}>
            <option value="Todos">Todos</option>
          </select>

          <label className="text-l font-bold text-gray-300 decoration-gray-400">Filtrar por Version: </label>
          <select className='text-gray-600 border border-gray-300 rounded outline-infigo-700' onChange={(e) => setVersionSeleccionada(e.target.value)}>
            <option value="Todas">Todas</option>
          </select>

          <label className="text-l font-bold text-gray-300 decoration-gray-400">Filtrar por Severidad: </label>
          <select className='text-gray-600 border border-gray-300 rounded outline-infigo-700' onChange={(e) => setSeveridadSeleccionada(e.target.value)}>
            <option value="Todas">Todas</option>
          </select>

          <label className="text-l font-bold text-gray-300 decoration-gray-400">Filtrar por Severidad: </label>
          <input className='text-gray-600 border border-gray-300 rounded outline-infigo-700' onChange={(e) => setClienteSeleccionado(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="text-center">
                    <HeaderItem title="Nro de Ticket" />
                    <HeaderItem title="Estado" />
                    <HeaderItem title="Severidad" />
                    <HeaderItem title="Fecha de Creación" />
                    <HeaderItem title="Tiempo Límite" />
                    <HeaderItem title="Producto Asociado" />
                    <HeaderItem title="Versión" />
                    <HeaderItem title="Acciones" isJustify={true} />
                  </tr>
                </thead>
                <tbody>
                  {/* {ticketsFiltrados.map((ticket) => (
                    <TicketGridRow key={ticket['numero']} ticket={ticket} />
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

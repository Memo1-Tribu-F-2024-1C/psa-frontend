import { useEffect, useState } from "react";
import TicketGridRow from "@/components/ticketGridRow";
import MostrarTarea from "@/components/mostrarTarea";
import { useRouter } from "next/router";
import { proyectosAxios, soportesAxios } from "@/api/axios";

function HeaderItem({ title, isBold, isJustify, }: { title: string; isBold?: boolean; isJustify?: boolean; }) {
  return (
    <th
      className={`px-6 py-3 text-sm text-left ${isBold ? "text-black" : "text-gray-200 uppercase"
        } ${isJustify ? "text-center" : ""} border-b border-gray-200`}
    >
      {title}
    </th>
  );
}

export default function Ticket({ id }: { id: any }) {
  const [tickets, setTickets] = useState([]);
  const [tarea, setTarea] = useState([]);
  const [proyecto, setProyecto] = useState([]);

  const obtenerTarea = () => {
    proyectosAxios
      .get(`/tarea/${id}`)
      .then((response) => {
        setTarea(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const obtenerTicktets = () => {
    soportesAxios
      .get(`/soporte/tickets/`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const obtenerProyecto = () => {
    proyectosAxios
      .get(`/proyecto/${id}`)
      .then((response) => {
        setProyecto(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    obtenerTarea();
    obtenerTicktets();
    obtenerProyecto();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);


  const tareaNombre: { nombre: string }[] = [{ nombre: 'Ejemplo' }];

  const ticketsFiltrados = tickets.filter((ticket: any) => ticket.idTareas.map(String).includes(String(id)));

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">
            {/* @ts-ignore */}
            Tarea: {tarea.nombre}
          </h1>
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">
            Listado de Tickets
          </h1>
          <br />
          <hr />
        </div>

        <MostrarTarea proyecto={proyecto} tarea={tarea} />

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="text-center">
                    <HeaderItem title="ID" />
                    <HeaderItem title="Nombre" />
                    <HeaderItem title="Descripción" />
                    <HeaderItem title="Fecha de Creacion" />
                    <HeaderItem title="Estado" />
                    <HeaderItem title="Severidad" />
                  </tr>
                </thead>
                <tbody>
                  {ticketsFiltrados.map((tickets) => (
                    <TicketGridRow
                      key={tickets["numeroTicket"]}
                      ticket={tickets}
                    />
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

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

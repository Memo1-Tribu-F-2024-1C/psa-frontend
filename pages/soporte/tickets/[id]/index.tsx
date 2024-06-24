import { useEffect, useState } from "react";
import TareaGridRow from "@/components/tareaGridRow";
import MostrarTicket from "@/components/mostrarTicket";
import { useRouter } from "next/router";
import { proyectosAxios, soportesAxios } from "@/api/axios";
import { Ticket, Tarea} from "@/types/types";


function HeaderItem({
    title,
    isBold,
    isJustify,
}: {
    title: string;
    isBold?: boolean;
    isJustify?: boolean;
}) {
    return (
        <th
            className={`px-6 py-3 text-sm text-left ${isBold ? "text-black" : "text-gray-200 uppercase"
                } ${isJustify ? "text-center" : ""} border-b border-gray-200`}
        >
            {title}
        </th>
    );
}

export default function TicketView({ id }: { id: any }) {
    const [ticket, setTicket] = useState({} as Ticket)
    const [tareas, setTareas] = useState([] as Tarea[]);
    
    const obtenerTareas = () => {
        proyectosAxios
            .get(`/tareas`)
            .then((response) => {
                setTareas(response.data.filter((tarea: Tarea) =>
                  ticket.idTareas.includes(tarea.id)));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const obtenerTicket = () => {
        soportesAxios
            .get(`/tickets/${id}`)
            .then((response) => {
                setTicket(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        obtenerTicket();
    }, [id]);

    useEffect(() => {
        if (ticket.idTareas) {
            obtenerTareas();
        }
    }, [ticket]);

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">
                        {/* @ts-ignore */}
                        Ticket: { ticket.titulo }
                    </h1>
                    {/* <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">
                        Listado de Tickets
                    </h1> */}
                    <br />
                    <hr />
                </div>

                <MostrarTicket ticket={ticket} />

                <div className="flex flex-col mt-8">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="text-center">
                                      <HeaderItem title="ID" />
                                      <HeaderItem title="Nombre" />
                                      <HeaderItem title="Colaborador" />
                                      <HeaderItem title="Estado" />
                                      <HeaderItem title="Prioridad" />
                                      <HeaderItem title="Fecha de Inicio" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {tareas.map((tarea) => (
                                        <TareaGridRow
                                            key={tarea["id"]}
                                            tarea={tarea}
                                            mostrarAcciones={false}
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
import { Bigelow_Rules } from "next/font/google";
import styles from "./mostrarTarea.module.css";
import { Ticket, Cliente, VersionProducto, Producto } from "@/types/types";
import { useEffect, useState } from "react";
import { soportesAxios } from "@/api/axios";


export default function MostrarTicket( { ticket} : { ticket: Ticket}) {

    const [clientes, setClientes] = useState([] as Cliente[]);
    const [version, setVersion] = useState<VersionProducto | null>(null);
    const [producto, setProducto] = useState<Producto | null>(null);

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const response = await soportesAxios.get('/clientes');
                setClientes(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const obtenerVersion = async () => {
            try {
                const response = await soportesAxios.get(`/versiones/${ticket.codigoVersion}`);
                setVersion(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        obtenerClientes();
        if (ticket.codigoVersion) {
            obtenerVersion();
        }
    }, [ticket]);

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const response = await soportesAxios.get(`/productos/${version?.idProducto}`);
                setProducto(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (version && version.idProducto) {
            obtenerProducto();
        }
    }, [version]);

    const cliente = clientes.find(c => c.CUIT === ticket.cuitCliente);

    return (
        <div className={styles.cajaTarea}>
            <div className={styles.caja1} >
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Numero: </div>
                    <div className="flex-grow"> {ticket['numeroTicket']} </div>
                </div>
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Titulo: </div>
                    <div className="flex-grow"> {ticket['titulo']} </div>
                </div>
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Descripción: </div>
                    <div className="flex-grow"> {ticket['descripcion']} </div>
                </div>
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Cliente: </div>
                    <div className="flex-grow">{cliente ? 
                      ( <b className=" text-gray-300">{cliente['razon social']}</b>) :
                      ( <span className="text-gray-300">No asignado</span>)} </div>
                </div>
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Estado Ticket: </div>
                    <div className="flex-grow"> {ticket['estado']} </div>
                </div>
            </div>

            <div className={styles.caja2}>
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Producto Asociado:</div>
                    <span className= "whitespace-pre">{producto?.nombre}</span>
                </div>
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Version:</div>
                    <div className="flex-grow">{version?.nombre}</div>
                </div>
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Lanzamiento:</div>
                    <div className="flex-grow">{version?.fechaCreacion}</div>
                </div>
                <div className="task-row my-1 flex">
                    <div className="w-40 font-semibold">Cantidad de Tareas:</div>
                    <div className="flex-grow">{ticket.idTareas?.length}</div>
                </div>
            </div>
        </div>
    )
}
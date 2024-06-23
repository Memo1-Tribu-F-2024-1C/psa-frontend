import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import VersionProductoGridRow from "@/components/VersionProductoGridRow"

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''} border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function ListarVersiones({ id }: { id: any }) {

  // versiones del producto asociado al id
  const versiones = [
    {
      id: "3.2",
      descripcion: "ipsum dolor",
      fechaCreacion: "fechaaa",
      duracionEstimada: 21345,
      idProducto: "1",
      idCliente: 1,
    },
    {
      id: "3.2",
      descripcion: "ipsum dolor",
      fechaCreacion: "fechaaa",
      duracionEstimada: 21345,
      idProducto: "23iii2",
      idCliente: 2,
    }
  ]

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Producto: {id} </h1>
          <br />
          <div>DETALLES<br />DETALLES<br />DETALLES<br />DETALLES<br /></div>
          <hr />
        </div>

        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Listado de Versiones</h1>
          <br />
          <hr />
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="text-center">
                    <HeaderItem title="Código" />
                    <HeaderItem title="Nombre" />
                    <HeaderItem title="Descripción" />
                    <HeaderItem title="Fecha de Creación" />
                    <HeaderItem title="Acciones" isJustify={true} />
                  </tr>
                </thead>
                {<tbody>
                  {
                    versiones.map((version: any) => (
                      <VersionProductoGridRow key={version['id']} version={version} codigoProducto={version['idProducto']}/>
                    ))
                  }
                </tbody>}
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

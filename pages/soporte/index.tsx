import { useEffect, useState } from "react";
import { soportesAxios } from "@/api/axios";
import { Producto, VersionProducto } from "@/types/types";
import ModalCrearTicket from "@/components/modalCrearTicket";
import VersionProductGridRow from "@/components/VersionProductoGridRow";

import { useSearchParams } from 'next/navigation'

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''} border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function Soporte() {
  const searchParams = useSearchParams()
  
  const [codigoProducto, setCodigoProducto] = useState(searchParams.get('producto'))

  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>(null as any);
  const [versiones, setVersiones] = useState<any[]>([]);

  useEffect(() => {
    soportesAxios.get('/productos')
       .then(response => {
         setProductos(response.data);
       })
       .catch(error => {
        console.error(error);
       });
  }, []);

  useEffect(() => {
    if (productos.length > 0 && codigoProducto && !productoSeleccionado) {
      const encontrado = productos.find((producto: Producto) => producto.codigo === parseInt(codigoProducto))
      encontrado && setProductoSeleccionado(encontrado)
    }
  }, [productos])

  
  useEffect(() => {
    productoSeleccionado && setVersiones([productoSeleccionado.versiones || []])
  },[productoSeleccionado])

  

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Productos PSA</h1>
          <select className={"text-black my-5"}
            onChange={(e) => {
              const seleccionado = productos.find((producto: Producto) => producto.nombre === e.target.value) || null;
              setProductoSeleccionado(seleccionado as Producto);
            }}
            value={productoSeleccionado ? productoSeleccionado.nombre : ''}
          >
            <option value="" disabled selected>Seleccionar producto</option>
            {productos.map((producto: any) => <option key={producto.codigo} value={producto.nombre}>{producto.nombre}</option>)}
          </select>
          <br />
          <hr />
        </div>

        {
          productoSeleccionado &&
          <>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Listado de versiones de {productoSeleccionado.nombre}</h1>
              <br />
              <hr />
            </div>
            <div className="flex flex-col mt-8">
              <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-center">
                        <HeaderItem title="Version" isJustify={true}/>
                        <HeaderItem title="Fecha de lanzamiento" isJustify={true}/>
                        <HeaderItem title="Acciones" isJustify={true} />
                      </tr>
                    </thead>
                    <tbody>
                      {
                        productoSeleccionado.versiones.map((version: VersionProducto) => (
                          <VersionProductGridRow key={version.codigo} version={version} codigoProducto={productoSeleccionado.codigo} />
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>


        }


      </div>
    </>
  );
}

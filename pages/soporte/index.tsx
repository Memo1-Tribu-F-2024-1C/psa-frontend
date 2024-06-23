import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { soportesAxios } from "@/api/axios";
import { Producto, VersionProducto } from "@/types/types";
import VersionProductGridRow from "@/components/VersionProductoGridRow";

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean }) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''} border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function Soporte() {

  const [productos, setProductos] = useState<Producto[]>([]);

  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [versiones, setVersiones] = useState<VersionProducto[]>([]);

  const router = useRouter();

  useEffect(() => {
    // soportesAxios.get(`/soporte/productos`)
    //   .then(response => {
    //     setProductos(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    setProductos([
      {
        codigo: "121342d3",
        nombre: "ERP1",
        versiones: [
          {
            codigo: "er334rg3r",
            nombre: "121rf45t45",
            fechaCreacion: "1233114124"
          },
          {
            codigo: "erqqwdqg3r",
            nombre: "21d3f21r121",
            fechaCreacion: "1233214324"
          },
        ]
      },
      {
        codigo: "123431d3",
        nombre: "ERP2",
        versiones: [
          {
            codigo: "ef1f1f12f12",
            nombre: "1333335",
            fechaCreacion: "123311124124"
          },
          {
            codigo: "e213124124",
            nombre: "12fver43",
            fechaCreacion: "123312214324"
          },
          {
            codigo: "12r23r33g4r",
            nombre: "fdvfewdaef",
            fechaCreacion: "123222214324"
          },
        ]
      },
    ])
  }, []);

  useEffect(() => {
    productoSeleccionado && {
      
    }
  },[productoSeleccionado])

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-200 decoration-gray-400">Productos PSA</h1>
          <select className={"text-black"}
            onChange={(e) => {
              const seleccionado = productos.find((producto) => producto.nombre === e.target.value) || null;
              setProductoSeleccionado(seleccionado);
            }}
            value={productoSeleccionado ? productoSeleccionado.nombre : ''}
          >
            <option value="" disabled selected>Seleccionar producto</option>
            {productos.map((producto: any) => <option value={producto.nombre}>{producto.nombre}</option>)}
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
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-center">
                        <HeaderItem title="Version" />
                        <HeaderItem title="Fecha de lanzamiento" />
                        <HeaderItem title="Acciones" isJustify={true} />
                      </tr>
                    </thead>
                    <tbody>
                      {
                        productoSeleccionado.versiones.map((version: VersionProducto) => (
                          <VersionProductGridRow key={version.codigo} version={version} />
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

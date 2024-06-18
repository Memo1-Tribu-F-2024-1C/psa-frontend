import { useEffect, useState } from "react";

function HeaderItem({ title, isBold, isJustify }: { title: string, isBold?: boolean, isJustify?: boolean}) {
  return (
    <th className={`px-6 py-3 text-sm text-left ${isBold ? 'text-black' : 'text-gray-200 uppercase'} ${isJustify ? 'text-center' : ''}  border-b border-gray-200`}>
      {title}
    </th>
  );
}

export default function Productos() {

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold decoration-gray-400 text-gray-200">Productos</h1>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-r border-l border-t border-solid border-gray-200 sm:rounded-lg">
              <table className="min-w-full ">
                <thead>
                  <tr className="text-center ">
                    <HeaderItem title="ID"  />
                    <HeaderItem title="Nombre"  />
                    <HeaderItem title="Descripción" />
                    <HeaderItem title="Duración estimada" />
                    <HeaderItem title="Versiones" isJustify={true}/>
                  </tr>
                </thead>

                {/* <tbody>
                  {productos.map((producto) => (
                    <ProductoGridRow key={producto['id']} producto={producto}/>
                  ))}
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

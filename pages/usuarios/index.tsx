import { useEffect, useState } from "react"
import { proyectosAxios } from "@/api/axios";
import UserGridRow from "@/components/userGridRow"

function HeaderItem({ title }: { title: string }) {
  return <th className="px-6 py-3 text-sm text-left  uppercase text-gray-200 border-b border-gray-200 ">{title}</th>
}

export default function Usuarios() {
  const [list, setList] = useState([])

  useEffect(() => {
    proyectosAxios.get('/recursos')
      .then(response => {
        console.log(response.data)
        setList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold decoration-gray-400 text-gray-200">Usuarios</h1>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle  border-b border-r border-l border-t border-solid border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <HeaderItem title="ID" />
                    <HeaderItem title="Nombre" />
                    <HeaderItem title="Apellido" />
                  </tr>
                </thead>

                <tbody>
                  {list.map((usuario) => (
                    <UserGridRow key={usuario['legajo']} usuario={usuario} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function UserGridRow({ usuario }: {usuario: any}) {
  return (
    <tr key={`${usuario['Nombre']}-${usuario['Apellido']}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{usuario['legajo']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{usuario['Nombre']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-m leading-5 text-gray-200">{usuario['Apellido']}</div>
      </td>
    </tr>
  )
}

export default function ClientGridRow({ cliente }: { cliente: any }) {

    return (
        <tr key={`${cliente['id']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center text-gray-200">{cliente['id']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center text-gray-200">{cliente['razon social']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-200">{cliente['CUIT']}</div>
            </td>
        </tr>
    )
}

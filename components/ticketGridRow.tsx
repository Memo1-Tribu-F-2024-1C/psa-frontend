import { Ticket } from "@/types/types";

export default function TicketGridRow({ ticket }: { ticket: Ticket }) {

  return (
    <tr key={`${ticket.numeroTicket}`}>
      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-m flex items-center text-gray-200">{ticket.numeroTicket}</div>
      </td>

      <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{ticket['titulo']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{ticket['descripcion']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-m leading-5 text-gray-200">{ticket['fechaDeCreacion']}</div>
      </td>

      <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{ticket['estado']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className=" text-m flex items-center text-gray-200">{ticket['severidad']}</div>
      </td>

    </tr>
  )
}
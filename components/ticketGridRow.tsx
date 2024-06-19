import { useState } from "react";
import { useRouter } from 'next/router';
import FormatDate from "./formatDate";
import { proyectosAxios } from "@/api/axios";


export default function TicketGridRow({ ticket }: { ticket: any }) {


  return (
    <tr key={`${ticket['numeroTicket']}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
        <div className="text-m flex items-center text-gray-200">{ticket['numeroTicket']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
        <div className="text-m flex items-center text-gray-200">{ticket['titulo']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
        <div className="text-m leading-5 text-gray-200">{ticket['descripcion']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
        <div className="text-m leading-5 text-gray-200"> {ticket['fechaDeCreacion']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
        <div className="text-m leading-5 text-gray-200">{ticket['estado']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
        <div className="text-m flex items-center text-gray-200">{ticket['severidad']}</div>
      </td>
    </tr>
  )
}
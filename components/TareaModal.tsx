import { useEffect, useState } from "react";
import styles from "./ticket.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  EstadoTarea,
  EstadoTicket,
  TicketDeProducto,
  Usuario,
} from "@/types/types";
import { axiosInstance } from "@/api/axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  usuarios: Usuario[];
  proyectos: any[];
  ticket?: TicketDeProducto;
  productVersionId: string;
}

interface Inputs {
  nombre: string;
  descripcion: string;
  estado: string;
  colaboradorId: string;
  proyectoId: string;
}

const TareaModal = (props: Props) => {
  const { isOpen, onClose, usuarios, proyectos, ticket, productVersionId } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nombre: "",
      descripcion: "",
      estado: "",
      colaboradorId: "",
      proyectoId: "",
    },
  });

  const updateTicket = (taskId: string) => {
    const newTasks = ticket?.tasks.map((task) => Number(task.id));
    newTasks?.push(Number(taskId));
    console.log("newTasks: ", newTasks);
    axiosInstance
      .put(`/tickets/${ticket?.id}`, {
        title: ticket?.title,
        description: ticket?.description,
        state: ticket?.state,
        severity: ticket?.severity,
        productVersionId: productVersionId,
        client: ticket?.client,
        listLinkedTasks: newTasks,
      })
      .then((response: any) => {
        // Handle the response
        console.log("Ticket updated: ", response.data);
        onClose();
      })
      .catch((error: any) => {
        // Handle the error
        console.error(error);
      });
  }

  const saveTarea = (data: Inputs) => {
    axiosInstance
      .post(`https://psa-backend-projectos.onrender.com/tarea`, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        estado: data.estado,
        colaborador: data.colaboradorId,
        proyecto: data.proyectoId
      })
      .then(async (response: any) => {
        // Handle the response
        console.log("Tarea saved: ", response.data);
        await updateTicket(response.data.id);
        onClose();
      })
      .catch((error: any) => {
        // Handle the error
        console.error(error);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Create Ticket with: ", data);
    await saveTarea(data);
    reset();
  };

  return (
    <div
      className={styles.modalContainer}
      style={{ display: isOpen ? "grid" : "none" }}
    >
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <h1 className="text-3xl font-bold decoration-gray-400">
            {"Asociar tarea nueva a ticket"}
          </h1>
          <button
            onClick={onClose}
            type="button"
            className={styles.closeButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.formItem}>
            <label className={styles.modalFont}>Título:</label>
            <input
              {...register("nombre", { required: true })}
              type="text"
              id="first_name"
              className={styles.inputStyle}
            />
            {errors.nombre && (
              <span className={styles.errorLabel}>Nombre es requerido</span>
            )}
          </div>

          <div>
            <label className={styles.modalFont}>Descripción:</label>
            <input
              {...register("descripcion", { required: true })}
              type="text"
              id="first_name"
              className={styles.inputStyle}
            />
            {errors.descripcion && (
              <span className={styles.errorLabel}>
                Descripción es requerido
              </span>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={styles.modalFont}>Colaborador:</label>
              <select
                {...register("colaboradorId")}
                className={styles.inputStyle}
              >
                {usuarios.map((usuario) => (
                  <option key={usuario.legajo} value={usuario.legajo}>
                    {`${usuario.Nombre} ${usuario.Apellido}`}
                  </option>
                ))}
              </select>
              {errors.colaboradorId && (
                <span className={styles.errorLabel}>
                  El colaborador es requerido
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={styles.modalFont}>Estado:</label>
              <select {...register("estado")} className={styles.inputStyle}>
                {Object.entries(EstadoTarea).map((estado) => (
                  <option key={estado[0]} value={estado[0]}>
                    {estado[1]}
                  </option>
                ))}
              </select>
              {errors.estado && (
                <span className={styles.errorLabel}>Estado es requerido</span>
              )}
            </div>

            <div>
              <label className={styles.modalFont}>Proyecto asociado:</label>
              <select {...register("proyectoId")} className={styles.inputStyle}>
                {proyectos.map((proyecto) => (
                  <option key={proyecto.id} value={proyecto.id}>
                    {proyecto.nombre}
                  </option>
                ))}
              </select>
              {errors.proyectoId && (
                <span className={styles.errorLabel}>
                  Severidad es requerido
                </span>
              )}
            </div>
          </div>
        </form>

        <div
          className={styles.modalFooter}
          style={{ justifyContent: "flex-end" }}
        >
          <button
            type="submit"
            className={styles.saveButton}
            onClick={handleSubmit(onSubmit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
            Guardar Ticket
          </button>

          <button onClick={onClose} className={styles.cancelButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TareaModal;

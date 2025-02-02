"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

interface Props {
  id?: number;
  type: "create" | "update" | "delete";
  data?: any;
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
}

const TeacherForm = dynamic(
  () => import("./forms/TeacherForm").then((mod) => mod.TeacherForm),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

const StudentForm = dynamic(
  () => import("./forms/TeacherForm").then((mod) => mod.TeacherForm),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

const forms: {
  [key: string]: React.ComponentType<{ type: "create" | "update"; data?: any }>;
} = {
  teacher: TeacherForm,
  student: StudentForm,
};

export const FormModal = ({ table, type, data, id }: Props) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-yellow"
      : type === "update"
        ? "bg-purple"
        : "bg-sky";
  const [open, setOpen] = useState(false);

  const Form = () => {
    if (type === "delete" && id) {
      return (
        <form action="" className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    } else if (type === "create" || type === "update") {
      const DynamicForm = forms[table]; // Obtiene el componente correspondiente
      return DynamicForm ? (
        <DynamicForm type={type} data={data} />
      ) : (
        <>Form not found!</>
      );
    } else {
      return <>Form not found!</>;
    }
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="Close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

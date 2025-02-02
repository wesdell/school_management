import React from "react";
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

const CitizenForm = dynamic(
  () => import("./CitizenForm").then((mod) => mod.CitizenForm),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

const forms: {
  [key: string]: React.ComponentType<{ type: "create" | "update"; data?: any }>;
} = {
  teacher: CitizenForm,
  student: CitizenForm,
};

export const Form = ({ type, id, table, data }: Props) => {
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
    const DynamicForm = forms[table];
    return DynamicForm ? (
      <DynamicForm type={type} data={data} />
    ) : (
      <>Form not found!</>
    );
  } else {
    return <>Form not found!</>;
  }
};

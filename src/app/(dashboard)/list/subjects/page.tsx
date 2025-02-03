import { role, subjectsData } from "@/mock/data";
import { FormModal, Pagination, Table } from "@/components";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  { header: "Subject", accessor: "subject" },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

export default function ListSubjects() {
  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.join(",")}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <Table columns={columns} data={subjectsData} renderRow={renderRow} />
      <Pagination />
    </>
  );
}

import { lessonsData, role } from "@/mock/data";
import { FormModal, Pagination, Table } from "@/components";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

const columns = [
  { header: "Subject", accessor: "subject" },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  { header: "Class", accessor: "class" },
  {
    header: "Actions",
    accessor: "actions",
  },
];

export default function ListLessons() {
  const renderRow = (item: Lesson) => (
    <tr
      key={item.id}
      className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="lesson" type="update" data={item} />
              <FormModal table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <Table columns={columns} data={lessonsData} renderRow={renderRow} />
      <Pagination />
    </>
  );
}

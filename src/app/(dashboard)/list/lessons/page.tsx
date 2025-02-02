import Image from "next/image";
import { role, lessonsData } from "@/mock/data";
import { FormModal, Pagination, Table, TableSearch } from "@/components";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

const columns = [
  { header: "Subject", accessor: "subject" },
  { header: "Class", accessor: "class" },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
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
    <div className="flex-1 p-4 bg-white rounded-md m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal type="create" table="lesson" />}
          </div>
        </div>
      </div>
      <div></div>
      <Table columns={columns} data={lessonsData} renderRow={renderRow} />
      <Pagination />
    </div>
  );
}

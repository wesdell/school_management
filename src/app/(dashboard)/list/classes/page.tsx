import Image from "next/image";
import { role, classesData } from "@/mock/data";
import { FormModal, Pagination, Table, TableSearch } from "@/components";

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

const columns = [
  { header: "Class", accessor: "class" },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

export default function ListClasses() {
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} />
              <FormModal table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 p-4 bg-white rounded-md m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal type="create" table="class" />}
          </div>
        </div>
      </div>
      <div></div>
      <Table columns={columns} data={classesData} renderRow={renderRow} />
      <Pagination />
    </div>
  );
}

import Image from "next/image";
import { role, parentsData } from "@/mock/data";
import { FormModal, Pagination, Table, TableSearch } from "@/components";

type Parent = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  address: string;
  students: string[];
};

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Students",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

export default function ListParents() {
  const renderRow = (item: Parent) => (
    <tr
      key={item.id}
      className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.students.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal data={item} type="update" table="parent" />
              <FormModal id={item.id} type="delete" table="parent" />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 p-4 bg-white rounded-md m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal type="create" table="parent" />}
          </div>
        </div>
      </div>
      <div></div>
      <Table columns={columns} data={parentsData} renderRow={renderRow} />
      <Pagination />
    </div>
  );
}

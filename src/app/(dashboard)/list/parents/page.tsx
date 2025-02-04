import { parentsData, role } from "@/mock/data";
import { FormModal, Table } from "@/components";

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

  return <Table columns={columns} data={parentsData} renderRow={renderRow} />;
}

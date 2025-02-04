import Image from "next/image";
import Link from "next/link";
import { role, studentsData } from "@/mock/data";
import { FormModal, Table } from "@/components";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  phone?: string;
  photo: string;
  address: string;
  grade: number;
  class: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
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

export default function ListStudents() {
  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt="Teacher"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky">
              <Image src="/view.png" alt="View action" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal id={item.id} type="delete" table="student" />
          )}
        </div>
      </td>
    </tr>
  );

  return <Table columns={columns} data={studentsData} renderRow={renderRow} />;
}

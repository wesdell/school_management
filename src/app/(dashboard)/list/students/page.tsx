import Image from "next/image";
import Link from "next/link";
import { Class, Prisma, Student } from "@prisma/client";
import prisma from "@/lib/prisma";
import { useRole } from "@/hooks";
import { RECORDS_PER_PAGE } from "@/constants";
import { FormModal, Pagination, Table } from "@/components";

type StudentList = Student & { class: Class };

const { role } = await useRole();

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
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];

const renderRow = (item: StudentList) => (
  <tr
    key={item.id}
    className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt="Teacher"
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.class.name}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.class.name[0]}</td>
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

export default async function ListStudents({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) {
  const { page, ...params } = await searchParams;
  const actualPage = page ? parseInt(page) : 1;

  const query: Prisma.StudentWhereInput = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId": {
            query.class = {
              lessons: {
                some: { teacherId: value },
              },
            };
            break;
          }
          case "search": {
            query.name = { contains: value, mode: "insensitive" };
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }

  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: { class: true },
      take: RECORDS_PER_PAGE,
      skip: RECORDS_PER_PAGE * (actualPage - 1),
    }),
    prisma.student.count({
      where: query,
    }),
  ]);

  return (
    <>
      <Table columns={columns} data={students} renderRow={renderRow} />
      <Pagination page={actualPage} count={count} />
    </>
  );
}

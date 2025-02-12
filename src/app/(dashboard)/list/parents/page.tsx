import { Parent, Prisma, Student } from "@prisma/client";
import prisma from "@/lib/prisma";
import { useRole } from "@/hooks";
import { RECORDS_PER_PAGE } from "@/constants";
import { FormModal, Pagination, Table } from "@/components";

type ParentList = Parent & { students: Student[] };

const { role } = await useRole();

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
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];

const renderRow = (item: ParentList) => (
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
    <td className="hidden md:table-cell">
      {item.students.map((student) => student.name).join(",")}
    </td>
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

export default async function ListParents({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) {
  const { page, ...params } = await searchParams;
  const actualPage = page ? parseInt(page) : 1;

  const query: Prisma.ParentWhereInput = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        switch (key) {
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

  const [parents, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: { students: true },
      take: RECORDS_PER_PAGE,
      skip: RECORDS_PER_PAGE * (actualPage - 1),
    }),
    prisma.parent.count({
      where: query,
    }),
  ]);

  return (
    <>
      <Table columns={columns} data={parents} renderRow={renderRow} />
      <Pagination page={actualPage} count={count} />
    </>
  );
}

import { Class, Prisma, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { role } from "@/mock/data";
import { RECORDS_PER_PAGE } from "@/constants";
import { FormModal, Pagination, Table } from "@/components";

type ClassList = Class & { supervisor: Teacher };

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

const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    <td className="hidden md:table-cell">{item.name[0]}</td>
    <td className="hidden md:table-cell">{`${item.supervisor.name} ${item.supervisor.surname}`}</td>
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

export default async function ListClasses({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) {
  const { page, ...params } = await searchParams;
  const actualPage = page ? parseInt(page) : 1;

  const query: Prisma.ClassWhereInput = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId": {
            query.supervisorId = value;
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

  const [classes, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: { supervisor: true },
      take: RECORDS_PER_PAGE,
      skip: RECORDS_PER_PAGE * (actualPage - 1),
    }),
    prisma.class.count({
      where: query,
    }),
  ]);

  return (
    <>
      <Table columns={columns} data={classes} renderRow={renderRow} />
      <Pagination page={actualPage} count={count} />
    </>
  );
}

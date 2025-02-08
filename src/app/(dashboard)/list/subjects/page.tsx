import { Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { role } from "@/mock/data";
import { RECORDS_PER_PAGE } from "@/constants";
import { FormModal, Pagination, Table } from "@/components";

type SubjectList = Subject & { teachers: Teacher[] };

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

const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">
      {item.teachers.map((teacher) => teacher.name).join(",")}
    </td>
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

export default async function ListParents({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) {
  const { page, ...params } = await searchParams;
  const actualPage = page ? parseInt(page) : 1;

  const query: Prisma.SubjectWhereInput = {};
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

  const [subjects, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: { teachers: true },
      take: RECORDS_PER_PAGE,
      skip: RECORDS_PER_PAGE * (actualPage - 1),
    }),
    prisma.subject.count({
      where: query,
    }),
  ]);

  return (
    <>
      <Table columns={columns} data={subjects} renderRow={renderRow} />
      <Pagination page={actualPage} count={count} />
    </>
  );
}

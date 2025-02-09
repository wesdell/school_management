import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { role } from "@/mock/data";
import { RECORDS_PER_PAGE } from "@/constants";
import { FormModal, Pagination, Table } from "@/components";

type AssignmentList = Assignment & {
  lesson: { class: Class; subject: Subject; teacher: Teacher };
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
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{`${item.lesson.teacher.name} ${item.lesson.teacher.surname}`}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

export default async function ListAssignments({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) {
  const { page, ...params } = await searchParams;
  const actualPage = page ? parseInt(page) : 1;

  const query: Prisma.AssignmentWhereInput = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        switch (key) {
          case "classId": {
            query.lesson = { classId: parseInt(value) };
            break;
          }
          case "teacherId": {
            query.lesson = { teacherId: value };
            break;
          }
          case "search": {
            query.lesson = {
              subject: {
                name: { contains: value, mode: "insensitive" },
              },
            };
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }

  const [assignments, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: RECORDS_PER_PAGE,
      skip: RECORDS_PER_PAGE * (actualPage - 1),
    }),
    prisma.assignment.count({
      where: query,
    }),
  ]);

  return (
    <>
      <Table columns={columns} data={assignments} renderRow={renderRow} />
      <Pagination page={actualPage} count={count} />
    </>
  );
}

import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { useRole } from "@/hooks";
import { RECORDS_PER_PAGE } from "@/constants";
import { FormModal, Pagination, Table } from "@/components";

type LessonList = Lesson & { subject: Subject } & { teacher: Teacher } & {
  class: Class;
};

const { role } = await useRole();

const columns = [
  { header: "Subject", accessor: "subject" },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  { header: "Class", accessor: "class" },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];

const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">{`${item.teacher.name} ${item.teacher.surname}`}</td>
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

export default async function ListLessons({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) {
  const { page, ...params } = await searchParams;
  const actualPage = page ? parseInt(page) : 1;

  const query: Prisma.LessonWhereInput = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        switch (key) {
          case "classId": {
            query.classId = parseInt(value);
            break;
          }
          case "teacherId": {
            query.teacherId = value;
            break;
          }
          case "search": {
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }

  const [lessons, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
      },
      take: RECORDS_PER_PAGE,
      skip: RECORDS_PER_PAGE * (actualPage - 1),
    }),
    prisma.lesson.count({
      where: query,
    }),
  ]);

  return (
    <>
      <Table columns={columns} data={lessons} renderRow={renderRow} />
      <Pagination page={actualPage} count={count} />
    </>
  );
}

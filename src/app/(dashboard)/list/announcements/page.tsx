import { Announcement, Class, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { useRole, useUserId } from "@/hooks";
import { RECORDS_PER_PAGE } from "@/constants";
import { FormModal, Pagination, Table } from "@/components";

type AnnouncementList = Announcement & { class: Class };

const { role } = await useRole();

const columns = [
  { header: "Title", accessor: "title" },
  { header: "Class", accessor: "class" },
  {
    header: "Date",
    accessor: "date",
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

const renderRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class?.name || " - "}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="announcement" type="update" data={item} />
            <FormModal table="announcement" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

export default async function ListAnnouncements({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) {
  const { userId } = await useUserId();
  const { page, ...params } = await searchParams;
  const actualPage = page ? parseInt(page) : 1;

  const query: Prisma.AnnouncementWhereInput = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        switch (key) {
          case "search": {
            query.title = { contains: value, mode: "insensitive" };
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };
  query.OR = [
    { classId: null },
    { class: roleConditions[role as keyof typeof roleConditions] } || {},
  ];

  const [announcements, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: { class: true },
      take: RECORDS_PER_PAGE,
      skip: RECORDS_PER_PAGE * (actualPage - 1),
    }),
    prisma.announcement.count({
      where: query,
    }),
  ]);

  return (
    <>
      <Table columns={columns} data={announcements} renderRow={renderRow} />
      <Pagination page={actualPage} count={count} />
    </>
  );
}

import { eventsData, role } from "@/mock/data";
import { FormModal, Pagination, Table } from "@/components";

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

const columns = [
  { header: "Title", accessor: "title" },
  { header: "Class", accessor: "class" },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

export default function ListEvents() {
  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-purpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td className="hidden md:table-cell">{item.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <Table columns={columns} data={eventsData} renderRow={renderRow} />
      <Pagination />
    </>
  );
}

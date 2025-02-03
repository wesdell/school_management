import React from "react";

interface Props {
  columns: { header: string; accessor: string; className?: string }[];
  data: any[];
  renderRow: (item: any) => React.ReactNode;
}

export const Table = ({ columns, data, renderRow }: Props) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-sm text-gray-500">
          {columns?.map((column) => (
            <th key={column.accessor} className={column.className}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data?.map((item: any) => renderRow(item))}</tbody>
    </table>
  );
};

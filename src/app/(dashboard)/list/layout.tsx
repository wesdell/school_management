"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getTitleFromPath } from "@/utils";
import { role } from "@/mock/data";
import { FormModal, TableSearch } from "@/components";

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);
  const canCreateForm = title.slice(0, -1).toLowerCase();

  return (
    <div className="flex-1 p-4 bg-white rounded-md m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All {title}</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table={canCreateForm} type="create" />
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

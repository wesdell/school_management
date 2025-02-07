"use client";

import { useRouter } from "next/navigation";
import { RECORDS_PER_PAGE } from "@/constants";

interface Props {
  page: number;
  count: number;
}

export const Pagination = ({ page, count }: Props) => {
  const router = useRouter();
  const hasPrevious = RECORDS_PER_PAGE * (page - 1) > 0;
  const hasNext = RECORDS_PER_PAGE * (page - 1) + RECORDS_PER_PAGE < count;

  const onChangePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrevious}
        onClick={() => onChangePage(page - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / RECORDS_PER_PAGE) },
          (_, idx) => {
            const pageIdx = idx + 1;
            return (
              <button
                key={pageIdx}
                onClick={() => onChangePage(pageIdx)}
                className={`px-2 rounded-sm ${page === pageIdx ? "bg-sky" : ""}`}
              >
                {pageIdx}
              </button>
            );
          },
        )}
      </div>
      <button
        disabled={!hasNext}
        onClick={() => onChangePage(page + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

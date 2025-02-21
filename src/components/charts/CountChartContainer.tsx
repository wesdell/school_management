import Image from "next/image";
import prisma from "@/lib/prisma";
import { CountChart } from "@/components";

export const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const countMap = Object.fromEntries(
    data.map(({ sex, _count }) => [sex, _count]),
  );
  const boys = countMap.MALE || 0;
  const girls = countMap.FEMALE || 0;
  const total = boys + girls;

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="More dots" width={20} height={20} />
      </div>
      <CountChart boys={boys} girls={girls} />
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-sky rounded-full"></div>
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">
            Boys ({Math.round((boys / total) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-yellow rounded-full"></div>
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">
            Girls ({Math.round((girls / total) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

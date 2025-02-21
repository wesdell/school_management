import Image from "next/image";
import prisma from "@/lib/prisma";

interface Props {
  type: "admin" | "student" | "teacher" | "parent";
}

export const UserCard = async ({ type }: Props) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };
  const records = await modelMap[type].count();

  return (
    <div className="rounded-2xl odd:bg-purple even:bg-yellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2025/26
        </span>
        <Image src="/more.png" alt="More dots" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{records}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

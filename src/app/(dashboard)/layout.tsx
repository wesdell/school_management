import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, NavBar } from "@/components";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Weschool</span>
        </Link>
        <Menu />
      </div>
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] flex flex-col">
        <NavBar />
        {children}
      </div>
    </div>
  );
}

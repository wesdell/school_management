import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useRole } from "@/hooks";

export const NavBar = async () => {
  const { role } = await useRole();

  return (
    <div className="flex items-center justify-between p-4">
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="Search icon" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      <div className="w-full flex items-center justify-end gap-6">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white cursor-pointer">
          <Image src="/message.png" alt="Message icon" width={20} height={20} />
        </div>
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white cursor-pointer">
          <Image
            src="/announcement.png"
            alt="Announcement icon"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center rounded-full text-xs text-white bg-purple-500">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">User</span>
          <span className="text-[10px] text-gray-500 text-right capitalize">
            {role}
          </span>
        </div>
        {/*<Image*/}
        {/*  src="/avatar.png"*/}
        {/*  alt="Avatar"*/}
        {/*  width={36}*/}
        {/*  height={36}*/}
        {/*  className="rounded-full"*/}
        {/*/>*/}
        <UserButton />
      </div>
    </div>
  );
};

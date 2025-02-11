"use server";

import { currentUser } from "@clerk/nextjs/server";

export const useRole = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return { role };
};

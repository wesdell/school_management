"use server";

import { auth } from "@clerk/nextjs/server";

export const useUserId = async () => {
  const { userId } = await auth();
  return { userId };
};

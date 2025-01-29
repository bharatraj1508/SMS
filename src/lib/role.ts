import { auth } from "@clerk/nextjs/server";

export const getUserRole = async () => {
  const { sessionClaims } = await auth();

  return (sessionClaims?.metadata as { role?: string }).role;
};

export const getUserID = async () => {
  const { userId } = await auth();

  return userId;
};

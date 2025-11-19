// this service is used for get the user id for user with email alice@example.com
// this userId will be used in controllers temporarily until auth is implemented
import prisma from "../../../../prisma/client";
import { User } from "@prisma/client";
import { ExtendedError } from "../middleware/errorHandler";

export const getTempUserId = async (): Promise<number> => {
  const tempUser: User | null = await prisma.user.findUnique({
    where: { email: "alice@example.com" },
  });

  if (tempUser === null) {
    const err: ExtendedError = new Error(
      "Temp user alice@example.com not found"
    );
    err.code = "TEMP_USER_NOT_FOUND";
    err.statusCode = 400;
    throw err;
  } else {
    return tempUser.id;
  }
};

import { db } from ".";
import { UserData } from "../../store/user/models";

export const firebaseFetchUser = async ({
  userId,
}: {
  userId: string;
}): Promise<UserData> => {
  const userDoc = await db.users.doc(userId).get();
  const userData = userDoc.data();

  return userData;
};

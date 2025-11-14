import * as tempUserRepo from "../apis/product/tempUserRepo";

// this is a temporary user service to simulate user login and get temp user id
// this is will be replaced when auth is implemented
export async function fetchTempUserId(): Promise<number> {
  const tempUserId: number = await tempUserRepo.fetchTempUserId();
  return tempUserId;
}

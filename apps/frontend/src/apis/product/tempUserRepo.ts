type tempUserResponseJSON = { message: string; data: number };

// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const TEMPUSER_ENDPOINT = "/tempuser";

export async function fetchTempUserId(): Promise<number> {
  // temporary user handling,  will remove when auth is implemented
  const tempUserResponse: Response = await fetch(
    `${BASE_URL}${TEMPUSER_ENDPOINT}`
  );
  if (!tempUserResponse.ok) {
    throw new Error("Failed to fetch temp user id from server");
  }
  const json: tempUserResponseJSON = await tempUserResponse.json();
  return json.data;
}

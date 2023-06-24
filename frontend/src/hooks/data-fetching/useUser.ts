import { get } from "@/utils/fetch";
import useSWR from "swr";

export function useUser() {
  return useSWR<any, any>("user", async () => {
    const response = await get(`/api/users/me`);
    return await response.json();
  });
}

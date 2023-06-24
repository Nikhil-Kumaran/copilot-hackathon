import { User } from "@/types";
import { get } from "@/utils/fetch";
import useSWR from "swr";

export function useUser() {
  return useSWR<User, Error>(
    "user",
    async () => {
      const response = await get(`/api/users/me`);
      return await response.json();
    },
    {
      errorRetryInterval: 100
    }
  );
}

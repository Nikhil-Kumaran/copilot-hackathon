import { get } from "@/utils/fetch";
import useSWR from "swr";

export function useGetTransactions(username: any) {
  return useSWR<any, any>("useGetTransactions" + username, async () => {
    const response = await get(`/api/transactions?filters[$and][0][user][username][$eq]=${username}&populate=*`);
    return await response.json();
  });
}

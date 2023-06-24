import { StrapiResponse, StrapiResponses, Transaction, TransactionType } from "@/types";
import { get } from "@/utils/fetch";
import useSWR from "swr";

export function useGetTransactions(username: string | undefined) {
  return useSWR<StrapiResponses<Transaction>, Error>("useGetTransactions" + username, async () => {
    const response = await get(`/api/transactions?filters[$and][0][user][username][$eq]=${username}&populate=*`);
    return await response.json();
  });
}

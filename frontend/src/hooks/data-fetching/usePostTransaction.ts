import useSWRMutation from "swr/mutation";
import { post } from "../../utils/fetch";
import { StrapiResponse, Transaction } from "@/types";

export function usePostTransactions() {
  return useSWRMutation<StrapiResponse<Transaction>, Error, string, StrapiResponse<Transaction>>("usePostTransactions", async (_, { arg }) => {
    const response = await post("/api/transactions", arg);
    return await response.json();
  });
}

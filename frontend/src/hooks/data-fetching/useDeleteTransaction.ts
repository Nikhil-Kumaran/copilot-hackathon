import useSWRMutation from "swr/mutation";
import { destroy, post, put } from "../../utils/fetch";
import { StrapiResponse, Transaction } from "@/types";

export function useDeleteTransactions() {
  return useSWRMutation<StrapiResponse<Transaction>, Error, string, string>("useDeleteTransactions", async (_, { arg }) => {
    const response = await destroy(`/api/transactions/${arg}`);
    return await response.json();
  });
}

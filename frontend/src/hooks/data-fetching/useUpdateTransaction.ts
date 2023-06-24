import useSWRMutation from "swr/mutation";
import { post, put } from "../../utils/fetch";
import { StrapiResponse, Transaction } from "@/types";

export function useUpdateTransactions(id) {
  return useSWRMutation<StrapiResponse<Transaction>, Error, string, StrapiResponse<Transaction>>("useUpdateTransactions", async (_, { arg }) => {
    const response = await put(`/api/transactions/${id}`, arg);
    return await response.json();
  });
}

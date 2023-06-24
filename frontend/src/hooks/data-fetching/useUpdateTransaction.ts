import useSWRMutation from "swr/mutation";
import { post, put } from "../../utils/fetch";

export function useUpdateTransactions(id) {
  return useSWRMutation<any, any, string, any>("useUpdateTransactions", async (_, { arg }) => {
    const response = await put(`/api/transactions/${id}`, arg);
    return await response.json();
  });
}

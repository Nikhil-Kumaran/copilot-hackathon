import useSWRMutation from "swr/mutation";
import { destroy, post, put } from "../../utils/fetch";

export function useDeleteTransactions() {
  return useSWRMutation<any, any, string, any>("useDeleteTransactions", async (_, { arg }) => {
    console.log("arg", arg, _);
    const response = await destroy(`/api/transactions/${arg}`);
    return await response.json();
  });
}

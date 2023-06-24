import useSWRMutation from "swr/mutation";
import { post } from "../../utils/fetch";

export function usePostTransactions() {
  return useSWRMutation<any, any, string, any>("usePostTransactions", async (_, { arg }) => {
    const response = await post("/api/transactions", arg);
    return await response.json();
  });
}

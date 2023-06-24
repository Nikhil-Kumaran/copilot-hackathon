import useSWRMutation from "swr/mutation";
import { post } from "../../utils/fetch";
import { ErrorResponse, LoginResponse, User } from "@/types";

export function useSignup() {
  return useSWRMutation<LoginResponse, ErrorResponse, string, User>("useSignup", async (_, { arg }) => {
    const response = await post("/api/auth/local/register", arg);
    return await response.json();
  });
}

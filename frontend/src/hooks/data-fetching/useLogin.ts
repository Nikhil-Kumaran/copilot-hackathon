import useSWRMutation from "swr/mutation";
import { post } from "../../utils/fetch";
import { ErrorResponse, LoginResponse, StrapiResponse, User } from "@/types";

export function useLogin() {
  return useSWRMutation<LoginResponse, ErrorResponse, string, User>("useLogin", async (_, { arg }) => {
    const response = await post("/api/auth/local", arg);
    return await response.json();
  });
}

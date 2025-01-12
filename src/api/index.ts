import { requestApi } from "@/service";

export function AuthLogin(params: any) {
  return requestApi("login", params, "post");
}

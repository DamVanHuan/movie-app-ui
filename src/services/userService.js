import { method, publicApi } from "./api";

export const userService = {
  login: p => publicApi("/users/login", method.post, p),
  register: p => publicApi("/users/register", method.post, p)
};

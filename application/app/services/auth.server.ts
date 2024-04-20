import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login } from "./login.server";

export const authenticator = new Authenticator<number>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    const examineeId = await login(String(email), String(password));
    return examineeId;
  }),
  "examinee-login"
);

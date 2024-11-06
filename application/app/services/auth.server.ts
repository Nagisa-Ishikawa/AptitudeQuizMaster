import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { corpLogin, login } from "./login.server";
import { sessionStorage, sessionStorageForCorp } from "./session.server";

export const authenticator = new Authenticator<number>(sessionStorage);
export const authenticatorForCorp = new Authenticator<number>(
  sessionStorageForCorp
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    const examineeId = await login(String(email), String(password));
    return examineeId;
  }),
  "examinee-login"
);

authenticatorForCorp.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    const employerId = await corpLogin(String(email), String(password));
    return employerId;
  }),
  "employer-login"
);

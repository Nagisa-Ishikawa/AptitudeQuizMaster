import type {
  ActionFunctionArgs,
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const logoutAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: "/" });
};

export const logoutLoader: LoaderFunction = async () => {
  return redirect("/");
};

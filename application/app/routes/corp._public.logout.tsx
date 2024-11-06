import type { LoaderFunction } from "@remix-run/node";
import { pages } from "../consts/pages";
import { authenticatorForCorp } from "../services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticatorForCorp.logout(request, {
    redirectTo: pages.corpLogin.path,
  });
};

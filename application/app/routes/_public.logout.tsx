import type { LoaderFunction } from "@remix-run/node";
import { pages } from "../consts/pages";
import { authenticator } from "../services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.logout(request, { redirectTo: pages.login.path });
};

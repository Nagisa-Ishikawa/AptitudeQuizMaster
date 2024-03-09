import { Outlet } from "@remix-run/react";

export default function LogoutRoute() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

import "@mantine/core/styles.css";
import "reflect-metadata";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { ErrorBoundary } from "./ErrorBoundary";
import { theme } from "./components/MantineTheme";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  return [{ title: "DIVX入社試験管理アプリ" }];
};

export default function App() {
  return (
    <html lang="ja" style={{ height: "100%" }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body style={{ height: "100%" }}>
        <MantineProvider theme={theme}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}

import type { Preview } from "@storybook/react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import React from "react";
import { theme } from "../app/components/MantineTheme";
import "@mantine/core/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (renderStory: any) => (
    <>
      <ColorSchemeScript />
      <MantineProvider theme={theme}>{renderStory()}</MantineProvider>
    </>
  ),
];

export default preview;

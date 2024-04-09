import type { Preview } from "@storybook/react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import React from "react";
import { theme } from "../app/components/MantineTheme";
import "@mantine/core/styles.css";
import { MemoryRouter } from "react-router-dom";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // mantine ui 対応用デコレータ
    (renderStory: any) => (
      <>
        <ColorSchemeScript />
        <MantineProvider theme={theme}>{renderStory()}</MantineProvider>
      </>
    ),
    // useNavigate 対応用
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;

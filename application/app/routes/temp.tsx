import { useMantineTheme } from "@mantine/core";

/**
 * TODO: （石川）後で消す
 */
export default function Index() {
  const theme = useMantineTheme();

  return (
    <main
      style={{
        height: "100%",
        backgroundColor: theme.colors.bodyColor[theme.primaryShade as number],
        color: theme.colors.textColor[theme.primaryShade as number],
      }}
    ></main>
  );
}

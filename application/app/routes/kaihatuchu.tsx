import { useMantineTheme } from "@mantine/core";
import { ButtonA } from "../components/Button/ButtonA";

/**
 * 開発中コンポーネント置き場
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
    >
      <div>ここに開発中コンポーネントを書いてね</div>
      <ButtonA>ボタン</ButtonA>
    </main>
  );
}

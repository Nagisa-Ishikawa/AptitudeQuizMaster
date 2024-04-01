import {
  Flex,
  RingProgress,
  Space,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "../../components/Link/Link";
import { TimerIcon } from "../../components/Icon/TimerIcon";
import { NavigateBefore } from "../../components/Icon/NavigateBefore";
import { primaryColor } from "../../components/MantineTheme";
import { CircleProgress } from "~/components/Progress/CircleProgress";

export default function Index() {
  const theme = useMantineTheme();

  return (
    <Stack w={"100%"} style={{ padding: "30px 80px 40px 80px" }}>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <NavigateBefore />
          <Link to="/exam/question" text="問題に戻る" />
        </Flex>
        <Flex align="center">
          <TimerIcon />
          <Space w="xs" />
          <Text
            style={{
              color: theme.colors.textColor[theme.primaryShade as number],
              fontSize: theme.fontSizes.sm,
              fontWeight: theme.other.fontWeights.bold,
            }}
          >
            全体の残り時間
          </Text>
          <Space w="xs" />
          <CircleProgress value={30} label="03:42" />
        </Flex>
      </Flex>
    </Stack>
  );
}

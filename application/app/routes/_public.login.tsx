import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import {
  Image,
  BackgroundImage,
  Button,
  Center,
  Stack,
  rem,
  useMantineTheme,
  PasswordInput,
  Input,
} from "@mantine/core";
import LoginBackgroundImage from "../../public/images/backgrounds/login.svg";
import Logo from "../../public/images/logo.svg";
import { HashIcon } from "../components/Icon/HashIcon";
import { KeyIcon } from "../components/Icon/KeyIcon";
import { VisibilityIcon } from "../components/Icon/VisibilityIcon";
import { useDisclosure } from "@mantine/hooks";

export default function LoginRoute() {
  const theme = useMantineTheme();
  const [visible, { toggle }] = useDisclosure(false);
  const inputStyleProps = {
    size: rem(64),
    styles: {
      input: { fontSize: theme.fontSizes.lg, paddingLeft: rem(70) },
      innerInput: {
        fontSize: theme.fontSizes.lg,
        paddingLeft: rem(70),
      },
      section: { marginLeft: rem(8) },
    },
    style: {
      border: "1px solid",
      borderColor: theme.colors.noteColor[theme.primaryShade as number],
      borderRadius: rem(10),
    },
  };

  return (
    <BackgroundImage src={LoginBackgroundImage} h="100%" w="100%">
      <Center h="100%">
        <Form method="post">
          <Stack w={rem(448)} gap={rem(40)}>
            <Image src={Logo} alt="divxロゴ" />
            <Stack gap={rem(20)}>
              {/* TODO: 今email認証だけど受験番号の方がいい気がしてきたので受験番号に揃える */}
              <Input
                placeholder="受験番号"
                type="email"
                name="email"
                required
                leftSection={<HashIcon size={rem(32)} />}
                {...inputStyleProps}
              />
              <PasswordInput
                placeholder="パスワード"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                visible={visible}
                leftSection={<KeyIcon size={rem(32)} />}
                rightSection={
                  <VisibilityIcon
                    isVisible={visible}
                    size={rem(32)}
                    onClick={toggle}
                  />
                }
                {...inputStyleProps}
              />
            </Stack>
            <Center>
              <Button
                type="submit"
                h={rem(76)}
                w={rem(320)}
                radius={rem(50)}
                style={{ fontSize: theme.fontSizes.xlll }}
              >
                ログイン
              </Button>
            </Center>
          </Stack>
        </Form>
      </Center>
    </BackgroundImage>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("examinee-login", request, {
    successRedirect: "/exam/start",
    // TODO: 失敗時にトースト・エラー表示
    failureRedirect: "/",
  });
}

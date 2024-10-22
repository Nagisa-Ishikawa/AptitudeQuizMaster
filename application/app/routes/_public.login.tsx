import {
  BackgroundImage,
  Center,
  Image,
  Input,
  PasswordInput,
  Stack,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import LoginBackgroundImage from "../../public/images/backgrounds/login.svg";
import Logo from "../../public/images/logo.svg";
import { ButtonA } from "../components/Button/ButtonA";
import { HashIcon } from "../components/Icon/HashIcon";
import { KeyIcon } from "../components/Icon/KeyIcon";
import { VisibilityIcon } from "../components/Icon/VisibilityIcon";
import { Notification } from "../components/Notification";
import { pages } from "../consts/pages";
import { authenticator } from "../services/auth.server";

export default function LoginRoute() {
  const data = useActionData<typeof action>();
  const [isError, setIsError] = useState<boolean>(!!data?.error);

  useEffect(() => {
    setIsError(data?.error);
  }, [data]);

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
      border: `${rem(1)} solid`,
      borderColor: theme.colors.noteColor[theme.primaryShade as number],
      borderRadius: rem(10),
    },
  };

  return (
    <main style={{ height: "100%" }}>
      {isError && (
        // TODO: なんかうまくいってない なんとかしてー
        <Notification
          title={"ログインに失敗しました"}
          onClose={() => setIsError(false)}
          mode="error"
        />
      )}
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
                <ButtonA
                  type="submit"
                  h={rem(76)}
                  w={rem(320)}
                  radius={rem(50)}
                  style={{ fontSize: theme.fontSizes.xlll }}
                >
                  ログイン
                </ButtonA>
              </Center>
            </Stack>
          </Form>
        </Center>
      </BackgroundImage>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator
    .authenticate("examinee-login", request, {
      successRedirect: pages.examStart.path,
      throwOnError: true,
    })
    .catch((e) => {
      if (e.status === StatusCodes.MOVED_TEMPORARILY) {
        return e;
      }
      return { error: e };
    });
}

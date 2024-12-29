/**
 * formのrefオブジェクトから入力値を取得し、オブジェクトに変換する
 * @param formRef formのrefオブジェクト
 * @returns データオブジェクト
 */
export function formRef2DataObj(formRef: React.RefObject<HTMLFormElement>) {
  const formElements = formRef.current?.elements;
  if (!formElements) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputs = {} as any;
  [...formElements].forEach((x) => {
    const inputElm = x as HTMLInputElement;
    inputs[inputElm.name] = inputElm.value;
  });

  return inputs;
}

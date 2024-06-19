import React from "react";
import { LinkedExamQuestion } from "../_private.exam";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  question: LinkedExamQuestion;
};

export const Question: React.FC<Props> = ({ question }: Props) => {
  return (
    <>
      {/* TODO: コードのハイライトとか豪華なmdにしたい */}
      {/* TODO: コピペできないように*/}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {question.question}
      </ReactMarkdown>
    </>
  );
};

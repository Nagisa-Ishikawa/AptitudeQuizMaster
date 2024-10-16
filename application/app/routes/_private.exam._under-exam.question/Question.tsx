import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LinkedExamQuestion } from "../_private.exam";

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

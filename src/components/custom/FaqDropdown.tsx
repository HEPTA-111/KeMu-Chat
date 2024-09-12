import React from "react";

interface Props {
  question: string;
  answer: string;
  open?: boolean;
}

const FaqDropdown = ({
  question: title,
  answer: content,
  open = false,
}: Props) => {
  return (
    <>
      <details
        className="group [&_summary::-webkit-details-marker]:hidden"
        {...(open ? { open: true } : {})}
      >
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
          <h2 className="font-medium">{title}</h2>

          <svg
            className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>

        <p className="mt-4 px-4 leading-relaxed text-gray-700">{content}</p>
      </details>
    </>
  );
};

export default FaqDropdown;

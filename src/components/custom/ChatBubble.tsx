import React from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "../ui/skeleton";

interface Props {
  message: string;
  bot: boolean;
  isLoading?: boolean;
}

const ChatBubble = ({ message, bot, isLoading = false }: Props) => {
  return (
    <div
      className={clsx(
        "w-11/12 md:8/12 lg:w-2/3 xl:w-1/2 2xl:w-1/3",
        bot ? "text-left" : "text-right"
      )}
    >
      <div
        className={clsx(
          "p-2 rounded",
          !bot && "bg-gray-100 rounded-tr-none",
          isLoading ? "w-full" : "inline-block"
        )}
      >
        {isLoading ? (
          <div className="flex flex-col space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-9/12" />
            <Skeleton className="h-4 w-4/12" />
          </div>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-bold mb-2" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-bold mb-2" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-4 mb-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-4 mb-2" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              a: ({ node, ...props }) => (
                <a className="text-blue-500 hover:underline" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre className="bg-gray-200 rounded p-2 mb-2" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-300 pl-2 italic mb-2"
                  {...props}
                />
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;

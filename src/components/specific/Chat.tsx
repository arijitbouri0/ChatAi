import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useRef, useEffect } from "react";
import type { RootState } from "../../redux/store";

type ChatProps = {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  lastMessageRef: React.RefObject<HTMLDivElement | null>;
  onScrollCheck: () => void;
};

const Chat: React.FC<ChatProps> = ({ scrollContainerRef, lastMessageRef, onScrollCheck }) => {
  const chatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { chats,selectedChatIndex } = useSelector((state: RootState) => state.chat);
  useEffect(() => {
  if (selectedChatIndex !== null && chatRefs.current[selectedChatIndex]) {
  const chatElement = chatRefs.current[selectedChatIndex];
  const spacer = document.createElement('div');
  const spacerHeight = '50px'; 

  spacer.style.height = spacerHeight;
  chatElement?.parentNode?.insertBefore(spacer, chatElement);

  spacer.scrollIntoView({ behavior: "smooth", block: "start" });

  setTimeout(() => {
    spacer.remove();
  }, 500);
}

}, [selectedChatIndex]);

  return (
  <div 
  ref={scrollContainerRef}
  onScroll={onScrollCheck}
  className="space-y-4 w-full max-w-[800px] mx-auto flex flex-col overflow-x-hidden pb-24 mt-16">
    {chats.length === 0 ? (
      <div className="min-h-[400px] items-center flex justify-center text-gray-600 dark:text-gray-300 text-3xl">
        What can I help with?
      </div>
    ) : (
      chats.map((chat, idx) => (
        <div
          key={idx}
          ref={(el) => { chatRefs.current[idx] = el; }}
          className="w-full bg-white dark:bg-gray-900 px-4 pb-20 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
        >
          <p className="font-semibold text-2xl text-blue-900 dark:text-blue-400 mb-2 text-right">
            Q: {chat.question}
          </p>

          <div className="prose prose-sm dark:prose-invert max-w-none overflow-x-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }: { node: { type: string; inline?: boolean }; className?: string; children?: React.ReactNode }) {
                  const codeString = String(children ?? "").replace(/\n$/, "");
                  const isInline = node?.inline;

                  if (isInline) {
                    return (
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                        {children}
                      </code>
                    );
                  }

                  const handleCopy = () => {
                    navigator.clipboard.writeText(codeString);
                  };

                  return (
                    <div className="my-2">
                      <div className="relative group">
                        <SyntaxHighlighter
                          style={materialDark}
                          language={className?.replace("language-", "") || "javascript"}
                          PreTag="div"
                          className="rounded-md my-2"
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                        <button
                          onClick={handleCopy}
                          className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  );
                },
                table({ children }) {
                  return (
                    <table className="table-auto border-collapse border border-gray-300 dark:border-gray-600 w-full text-sm">
                      {children}
                    </table>
                  );
                },
                th({ children }) {
                  return (
                    <th className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 px-2 py-1 text-left font-semibold">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return (
                    <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                      {children}
                    </td>
                  );
                },
              }}
            >
              { chat.answer}
            </ReactMarkdown>
          </div>
        </div>
      ))
    )}
    <div ref={lastMessageRef} className="h-1" />
  </div>
  );
};

export default Chat;

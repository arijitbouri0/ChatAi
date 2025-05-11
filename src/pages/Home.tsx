import { useSelector } from "react-redux";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import Chat from "../components/specific/Chat";
import Input from "../components/specific/Input";
import type { RootState } from "../redux/store";
import { useRef, useState } from "react";

const Home: React.FC = () => {
  const { menuBar } = useSelector((state: RootState) => state.misc);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScrollCheck = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;
    setShowScrollButton(!isAtBottom);
  };
  const handleScroll = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {menuBar && <Sidebar />}
      <div
        className={`h-screen flex-col ${
          menuBar ? "ml-64" : ""
        } transition-all duration-300 relative`}
      >
        <div className="fixed top-0 z-40 w-full">
          <Navbar />
        </div>
        <div
          className="h-[calc(100vh-72px-64px)] flex-1 overflow-y-auto px-4 dark:bg-gray-900 bg-white"
          ref={scrollContainerRef}
          onScroll={handleScrollCheck}
        >
          <Chat
            scrollContainerRef={scrollContainerRef}
            lastMessageRef={lastMessageRef}
            onScrollCheck={handleScrollCheck}
          />
          {showScrollButton && (
            <button
              onClick={handleScroll}
              className="fixed bottom-40 left-[50%] transform -translate-x-1/2 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-100 p-2 rounded-full mx-auto shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 z-50 cursor-pointer border-2 border-gray-400 dark:border-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19V5m0 14-4-4m4 4 4-4"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="h-[140px] px-4 w-full dark:bg-gray-900 bg-white absolute bottom-0">
          <Input />
        </div>
      </div>
    </>
  );
};

export default Home;

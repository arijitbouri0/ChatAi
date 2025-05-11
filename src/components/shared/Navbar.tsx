import { useDispatch, useSelector } from "react-redux";
import { openMenuBar } from "../../redux/reducers/misc";
import ThemeToggle from "../../styles/ThemeToggle";
import type { RootState } from "../../redux/store";
import TooltipWrapper from "../../styles/TooltipWrapper";
import { clearChats } from "../../redux/reducers/chat";
const Navbar: React.FC = () => {
  const { menuBar } = useSelector((state: RootState) => state.misc);
  const dispatch = useDispatch();
  const handleOpenMenu = (): void => {
    dispatch(openMenuBar());
  };
  const baseClasses =
    "h-[56px] flex items-center justify-between px-4 md:px-8 py-2 sticky top-0 transition-all duration-300";
  const menuBarClasses = menuBar
    ? "md:w-[calc(100%-16rem)] mssd:shadow-2xss md:bg-white md:dark:bg-gray-800 md:border-b md:border-gray-200 md:dark:border-gray-700 sm:bg-white sm:dark:bg-gray-800 sm:border-b sm:border-gray-200 sm:dark:border-gray-700"
    : "md:bg-blur-none md:border-none sm:bg-white sm:dark:bg-gray-800 sm:border-b sm:border-gray-200 sm:dark:border-gray-700 bg-blur-none border-none";

  return (
    <div className={`${baseClasses} ${menuBarClasses}`}>
      {!menuBar && (
        <div className="flex space-x-4 text-black">
          <TooltipWrapper content="Open Sidebar">
            <button
              onClick={handleOpenMenu}
              className="flex items-center justify-center rounded-md w-10 h-10 hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                  d="m6 10 2 2-2 2M11 5v14m-7 0h16c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1Z"
                />
              </svg>
            </button>
          </TooltipWrapper>
          <TooltipWrapper content="Clear Chats">
            <button 
            onClick={()=>dispatch(clearChats())}
            className="flex items-center justify-center w-10 h-10 rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.4"
                stroke="currentColor"
                className="w-5 h-5 md:w-6 md:h-6 text-gray-800 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </TooltipWrapper>
        </div>
      )}

      <div className="text-sm md:text-base text-black font-medium ml-auto">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;

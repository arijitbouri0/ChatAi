import { closeMenuBar } from "../../redux/reducers/misc";
import { useDispatch, useSelector } from "react-redux";
import { clearChats, setSelectedChatIndex } from "../../redux/reducers/chat";
import type { RootState } from "../../redux/store";
import TooltipWrapper from "../../styles/TooltipWrapper";

const Sidebar: React.FC = () => {
  const { chats } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const handleClose = (): void => {
    dispatch(closeMenuBar());
  };

  const handleClear = (): void => {
    dispatch(clearChats());
  };
  return (
    <div className="fixed flex flex-col top-0 left-0 h-screen z-50 w-64 dark:bg-gray-800 bg-gray-100 px-2 py-4">
      <div className="flex justify-between mb-4 sticky px-4">
        <TooltipWrapper content="Close Sidebar" side="bottom" align="start">
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.4"
                d="M7.99994 10 6 11.9999l1.99994 2M11 5v14m-7 0h16c.5523 0 1-.4477 1-1V6c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z"
              />
            </svg>
          </button>
        </TooltipWrapper>
        <TooltipWrapper content="Clear Chats" side="bottom" align="end">
          <button
            onClick={handleClear}
            className="w-10 h-10 flex items-center justify-center rounded-md p-auto hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.4"
              stroke="currentColor"
              className="size-6"
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

      <div className="flex-1 pb-4 overflow-y-auto">
        <p className="text-gray-700 font-medium pb-3 px-2 dark:text-gray-400">
          Chats
        </p>
        <ul className="space-y-0.5">
          {chats?.map((chat, idx) => (
            <li
              key={idx}
              className="text-sm p-2 rounded-md text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => dispatch(setSelectedChatIndex(idx))}
            >
              {chat.question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import * as Toast from "@radix-ui/react-toast";
import { useRef, useState } from "react";

let show: (msg: string) => void;

export const showToast = (msg: string) => {
  if (show) show(msg);
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Welcome!");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  show = (msg: string) => {
    setMessage(msg);
    setOpen(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), 10);
  };

  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      {children}
      <Toast.Root
        className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md 
          bg-gray-300 dark:bg-neutral-800 
          p-[15px] shadow-lg dark:shadow-md 
          text-gray-800 dark:text-gray-100
          [grid-template-areas:'title_action''description_action']
          data-[swipe=cancel]:translate-x-0
          data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
          data-[state=closed]:animate-hide
          data-[state=open]:animate-slideIn
          data-[swipe=end]:animate-swipeOut
          data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="mb-[5px] text-[15px] font-medium [grid-area:_title]">
          {message}
        </Toast.Title>

        <Toast.Action
          className="[grid-area:_action]"
          asChild
          altText="undo"
        >
          <button
            className="inline-flex h-[25px] items-center justify-center rounded 
              bg-green-200 dark:bg-green-700 
              px-2.5 text-xs font-medium 
              text-green-900 dark:text-green-100 
              hover:bg-green-300 dark:hover:bg-green-600
              focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Undo
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="fixed top-4 right-4 z-50" />
    </Toast.Provider>
  );
};

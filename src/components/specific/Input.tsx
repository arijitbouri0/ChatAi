import { useEffect, useState } from "react";
import { useGenerateContentMutation } from "../../redux/api/api";
import { useDispatch } from "react-redux";
import { saveChat } from "../../redux/reducers/chat";
import TooltipWrapper from "../../styles/TooltipWrapper";
import { showToast } from "../../styles/ToastProvider";

const Input: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [generateContent, { data, isLoading,isError }] = useGenerateContentMutation();
  const dispatch = useDispatch();
  const [submittedQuestion, setSubmittedQuestion] = useState<string>("");

  const handleSubmit = async () => {
    if (!question.trim()) return;

    const payload = {
      contents: [
        {
          parts: [{ text: question }],
        },
      ],
    };

    setSubmittedQuestion(question);
    setQuestion("");
    await generateContent(payload);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
  if (isError) {
    showToast("Something went wrong. Please try again.");
  }
}, [isError]);
  
  useEffect(() => {
    if (data && submittedQuestion) {
      const answer =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";

      dispatch(saveChat({ question: submittedQuestion, answer }));
      setSubmittedQuestion("");
    }
  }, [data, submittedQuestion, dispatch]);

  return (
    <div className="w-full max-w-[800px] mx-auto border dark:bg-neutral-950 dark:border-gray-800 border-gray-300 p-4 rounded-3xl shadow-2xl shadow-gray-400 dark:shadow-gray-800">
      <textarea
        rows={1}
        placeholder="Ask Anything..."
        className="w-full px-3 py-2 outline-none rounded-lg dark:text-gray-100 text-gray-500"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex justify-end px-4 mt-2 ml-auto">
        <TooltipWrapper
          content={
            isLoading
              ? "Sending..."
              : question.length > 0
              ? "Click to send"
              : "Type a question"
          }
        >
          <button
            className="text-MD text-black font-semibold dark:text-gray-100 px-3 py-1 rounded-md cursor-pointer"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading
              ? "Sending..."
              : question.length > 0
              ? "Ask"
              : "Type..."}
          </button>
        </TooltipWrapper>
      </div>
    </div>
  );
};

export default Input;

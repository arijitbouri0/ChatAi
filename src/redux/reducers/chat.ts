import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define interfaces
interface Chat {
  question: string;
  answer: string;
}

interface ChatsState {
  chats: Chat[];
  selectedChatIndex: number | null;
}

// Define the initial state
const initialState: ChatsState = {
  chats: [],
  selectedChatIndex: null,
};

// Create the slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveChat(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload);
    },
    setSelectedChatIndex(state, action: PayloadAction<number>) {
      state.selectedChatIndex = action.payload;
    },
    clearChats(state) {
      state.chats = [];
      state.selectedChatIndex = null;
    },
  },
});

// Export actions and reducer
export const { saveChat, setSelectedChatIndex, clearChats } = chatSlice.actions;
export default chatSlice;

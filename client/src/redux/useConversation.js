/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedConversation: null,
	messages: [],
};

const conversationSlice = createSlice({
	name: "conversation",
	initialState,
	reducers: {
		setSelectedConversation: (state, action) => {
			state.selectedConversation = action.payload;
		},
		setMessages: (state, action) => {
			state.messages = action.payload;
		},
	},
});

export const { setSelectedConversation, setMessages } = conversationSlice.actions;
export default conversationSlice.reducer;

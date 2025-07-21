/** @format */

import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useParams } from "react-router-dom";

const useSendMessage = () => {
	const { id } = useParams();

	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	// Get user and token from localStorage
	let user = null;
	let token = null;
	try {
		user = JSON.parse(localStorage.getItem("user"));
		token = user?.token;
	} catch (e) {
		user = null;
		token = null;
	}

	// The receiverId should come from the selectedConversation, not the logged-in user
	const receiverId = id;

	const sendMessage = async (message) => {
		if (!receiverId) {
			toast.error("No conversation selected.");
			return;
		}
		if (!token) {
			toast.error("Authentication failed. Please log in again.");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(`http://localhost:8800/chat/send/${receiverId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message || "Failed to send message");
		} finally {
			setLoading(false);
		}
	};
	return { sendMessage, loading };
};

export default useSendMessage;

/** @format */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation.js";
import { useParams } from "react-router-dom";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages } = useConversation();
	const { id } = useParams();
	let token = null;
	try {
		token = JSON.parse(localStorage.getItem("user")).token;
	} catch (e) {
		token = null;
	}

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`http://localhost:8800/chat/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message || "Failed to fetch messages");
			} finally {
				setLoading(false);
			}
		};

		if (id) getMessages();
	}, [id, setMessages]);

	return { messages, loading };
};

export default useGetMessages;

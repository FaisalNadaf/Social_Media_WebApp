/** @format */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation.js";
import { useParams } from "react-router-dom";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages } = useConversation();
	const { id } = useParams();

	console.log("getchatId", id);
	console.log("GETTING MESSEGESSSSS");
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`http://localhost:8800/chat/${id}`);
				const data = await res.json();
				console.log("data", data);
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

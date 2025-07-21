/** @format */
import useListenMessages from "../../hooks/useListenMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message";
import React, { useEffect, useRef, useState } from "react";
import useGetMessages from "../../hooks/useGetMesages.js";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	const messagesEndRef = useRef(null);
	const [prevMessagesLength, setPrevMessagesLength] = useState(0);

	useListenMessages();

	useEffect(() => {
		// Only scroll if new messages were added (not on initial load)
		if (messages.length > prevMessagesLength && messages.length > 0) {
			messagesEndRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
		setPrevMessagesLength(messages.length);
	}, [messages.length]); // Only trigger on length changes

	return (
		<div className="px-4 flex-1 overflow-auto">
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<Message
						key={message._id}
						message={message}
					/>
				))}

			{loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length === 0 && (
				<p className="text-center">Send a message to start conversation</p>
			)}

			{/* More subtle scroll marker */}
			<div
				ref={messagesEndRef}
				className="h-px"
			/>
		</div>
	);
};

export default Messages;

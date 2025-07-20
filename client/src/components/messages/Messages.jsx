/** @format */

import useListenMessages from "../../hooks/useListenMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message";
import React, { useEffect, useRef } from "react";

import useGetMessages from "../../hooks/useGetMesages.js";

const Messages = () => {
  console.log(
    "--------------------------------------------------------------------------",
  );
console.log("CALL MESSAGE FUNCTION")
  console.log(
    "--------------------------------------------------------------------------",
  );
	const { messages, loading } = useGetMessages();
	const lastMessageRef = useRef();

	useListenMessages();
	// console.log("messages : ", messages.message);
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({
				behavior: "smooth",
			});
		}, 50);
	}, [messages]);

	return (
		<div className="px-4 flex-1 overflow-auto h-full ">
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div
						key={message._id}
						ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
			{loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className="text-center "> Send a message to start conversation</p>
			)}
		</div>
	);
};

export default Messages;

/** @format */

import React from "react";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { getUserInfo } from "../../utils";
import { useParams } from "react-router-dom";

const Message = ({ message }) => {
	const authUser = JSON.parse(localStorage.getItem("user"));
	const { id } = useParams();
	const chatUser = getUserInfo(authUser.token, id);
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser.userId;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : chatUser.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	// console.log('Message : ' + message)

	return (
		<>
			<div className={`chat ${chatClassName}`}>
				<div className="chat-image avatar">
					<div className="w-10 rounded-full">
						<img
							alt="Tailwind CSS chat bubble component"
							src={profilePic}
						/>
					</div>
				</div>
				<div
					className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} p-2`}>
					{message.message}
				</div>
				<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
					{formattedTime}
				</div>
			</div>
		</>
	);
};

export default Message;

/** @format */

import React from "react";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { getUserInfo } from "../../utils";
import { useParams } from "react-router-dom";

const Message = ({ message }) => {
	const authUser = JSON.parse(localStorage.getItem("user"));
	const { id } = useParams();

	const [chatUser, setChatUser] = React.useState(null);

	React.useEffect(() => {
		let isMounted = true;
		getUserInfo(authUser.token, id).then((user) => {
			if (isMounted) setChatUser(user);
		});
		return () => {
			isMounted = false;
		};
	}, [authUser.token, id]);
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;

	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profileUrl : chatUser?.profileUrl;
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
				<div className="chat-header">
					{fromMe ? authUser.firstName : chatUser?.firstName}
					<time className="text-xs opacity-50">{formattedTime}</time>
				</div>
				<div className="chat-bubble">{message.message}</div>
			</div>
		</>
	);
};

export default Message;

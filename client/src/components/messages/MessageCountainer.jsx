/** @format */

import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import previous from "../../assets/previous.png";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { NoProfile } from "../../assets";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../utils";

const MessageCountainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [userInfo, setUserInfo] = useState(null);
	const { id } = useParams();
	const authUser = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			if (authUser?.token && id) {
				const res = await getUserInfo(authUser.token, id);
				setUserInfo(res);
			}
		};
		fetchUser();
	}, [authUser?.token, id]);

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className="w-full h-full  md:min-w-[450px] flex flex-col">
			<>
				<div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center ">
					<div className="flex items-center gap-2">
						<Link to={"/profile/" + (userInfo?._id || id)}>
							<img
								src={userInfo?.profileUrl ?? NoProfile}
								alt={userInfo?.firstName}
								className="w-8 h-8 object-cover rounded-full"
							/>
						</Link>
						<div>
							<span className="label-text">To:</span>
							<span className="text-gray-900 font-bold ml-1">
								{userInfo?.fullName ||
									userInfo?.firstName + " " + userInfo?.lastName}
							</span>
							{userInfo?.location && (
								<span className="ml-2 text-xs text-ascent-2">
									{userInfo.location}
								</span>
							)}
						</div>
					</div>
					<button onClick={() => setSelectedConversation(null)}>
						<img
							src={previous}
							alt=""
							className="h-6"
						/>
					</button>
				</div>
				<Messages />
				<MessageInput />
			</>
		</div>
	);
};

export default MessageCountainer;

const NoChatSelected = () => {
	const authUser = JSON.parse(localStorage.getItem("user"));
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
				<p>
					Welcome 👋 {authUser?.firstName || authUser?.fullName || "User"}💫
				</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className="text-3xl md:text-6xl text-center" />
			</div>
		</div>
	);
};

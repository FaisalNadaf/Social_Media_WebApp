/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { NoProfile } from "../assets";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
// import { postComments } from "../assets/data";
import {
	apiRequest,
	deletePost,
	fetchPosts,
	getUserInfo,
	likePost,
} from "../utils";
import { updateComments } from "../redux/postSlice";
import { useDispatch } from "react-redux";

const MessageCard = ({ user, chats }) => {
	const { id } = useParams();

	const [showAll, setShowAll] = useState(0);
	const [showReply, setShowReply] = useState(0);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [replyComments, setReplyComments] = useState(0);
	const [showComments, setShowComments] = useState(0);
	const [userInfo, setUserInfo] = useState(user);

	const dispatch = useDispatch();

	const getUser = async () => {
		const res = await getUserInfo(user?.token, id);
		setUserInfo(res);
	};

	const fetchPost = async () => {
		await fetchPosts(user?.token, dispatch);
	};

	const handleLike = async (uri) => {
		await likePost(user?.token, uri);
		await fetchPost();
	};

	useEffect(() => {
		getUser();
	}, [id]);

	return (
		<div className="mb-2 bg-primary p-4 rounded-xl">
			<div className="flex gap-3 items-center mb-2 border-b border-b-ascent-2 pb-4">
				<Link to={"/profile/" + id}>
					<img
						src={userInfo?.profileUrl ?? NoProfile}
						alt={userInfo?.firstName}
						className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
					/>
				</Link>

				<div className="w-full flex justify-between">
					<div className="">
						<Link to={"/profile/" + userInfo?._id}>
							<p className="font-medium text-lg text-ascent-1">
								{userInfo?.firstName} {userInfo?.lastName}
							</p>
						</Link>
						<span className="text-ascent-2">{userInfo?.location}</span>
						<span className="md:hidden flex text-ascent-2 text-sm">
							{moment(userInfo?.createdAt ?? "2023-05-25").fromNow()}
						</span>
					</div>

					<span className="hidden md:flex text-ascent-2">
						{moment(userInfo?.createdAt ?? "2023-05-25").fromNow()}
					</span>
				</div>
			</div>

			{chats?.map((chat) => {
				return (
					<div
						className={`chat ${
							chat?.sender === user?._id ? "chat-end" : "chat-start"
						}`}>
						<div className="chat-image avatar">
							<div className="w-10 rounded-full">
								<img
									alt={chat?.sender?.firstName}
									src={
										chat?.sender === user?._id
											? (user?.profileUrl ?? NoProfile)
											: (userInfo?.profileUrl ?? NoProfile)
									}
								/>
							</div>
						</div>
						<div className="chat-header">
							{chat?.sender === user?._id
								? user?.firstName
								: userInfo?.firstName}
							<time className="text-xs opacity-50">
								{moment(chat?.createdAt).format("HH:mm")}
							</time>
						</div>
						<div className="chat-bubble flex items-center gap-2">
							<span>{chat?.message}</span>
						</div>
						{chat?.sender === user?._id && (
							<div className="chat-footer opacity-50">
								{chat?.isRead ? "Read" : "Delivered"}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default MessageCard;

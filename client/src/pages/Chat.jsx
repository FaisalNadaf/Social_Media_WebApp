/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	FriendsCard,
	Loading,
	PostCard,
	ProfileCard,
	TopBar,
} from "../components";
import { deletePost, fetchPosts, getUserInfo, likePost } from "../utils";
import { UserLogin } from "../redux/userSlice";
import MessageCard from "../components/MessageCard";
import MessageCountainer from "../components/messages/MessageCountainer";
// import { posts } from "../assets/data";

const Chat = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("user"));
	const { posts } = useSelector((state) => state.posts);
	const [userInfo, setUserInfo] = useState(user);
	const [loading, setLoading] = useState(false);
	const uri = "/posts/get-user-post/" + id;

	const getUsers = async () => {
		const res = await getUserInfo(user?.token);
		const newData = { token: user?.token, ...res };
		dispatch(UserLogin(newData));
	};

	// const getUser = async () => {
	// 	const res = await getUserInfo(user?.token, id);
	// 	setUserInfo(res);
	// };

	const getPosts = async () => {
		await fetchPosts(user?.token, dispatch, uri);
		setLoading(false);
	};

	const handleDelete = async (id) => {
		await deletePost(id, user?.token);
		await getPosts();
	};
	const handleLikePost = async () => {
		await likePost({ uri: uri, token: user?.token });
		await getPosts();
	};

	useEffect(() => {
		setLoading(true);
		// getUser();
		getPosts();
	}, [id]);

	const mockChats = [
		{
			_id: "665dfe5d8a0b9dabcde12345",
			sender: "6879e96bade29a42990d0f56", // User A
			receiver: "686fd15f37c257737a2473c2", // User B
			message: "Hey, how are you?",
			messageType: "text",
			isRead: true,
			createdAt: new Date("2024-06-01T10:30:00Z"),
			updatedAt: new Date("2024-06-01T10:30:00Z"),
		},
		{
			_id: "665dfe5d8a0b9dabcde12346",
			sender: "686fd15f37c257737a2473c2", // User B
			receiver: "6879e96bade29a42990d0f56", // User A
			message: "I'm good! Sending image.",
			messageType: "text",
			isRead: true,
			createdAt: new Date("2024-06-01T10:31:00Z"),
			updatedAt: new Date("2024-06-01T10:31:00Z"),
		},
		{
			_id: "665dfe5d8a0b9dabcde12347",
			sender: "6879e96bade29a42990d0f56", // User A
			receiver: "686fd15f37c257737a2473c2", // User B
			message: "Check out this audio!",
			messageType: "text",
			isRead: true,
			createdAt: new Date("2024-06-01T10:32:00Z"),
			updatedAt: new Date("2024-06-01T10:32:00Z"),
		},
		{
			_id: "665dfe5d8a0b9dabcde12348",
			sender: "686fd15f37c257737a2473c2", // User C
			receiver: "6879e96bade29a42990d0f56", // User A
			message: "Here is the document.",
			messageType: "text",
			isRead: true,
			createdAt: new Date("2024-06-01T10:35:00Z"),
			updatedAt: new Date("2024-06-01T10:36:00Z"),
		},
	];

	return (
		<>
			<div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
				<TopBar />
				<div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full">
					{/* LEFT */}
					<div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto">
						<ProfileCard user={userInfo} />

						<div className="block lg:hidden">
							<FriendsCard friends={userInfo?.friends} />
						</div>
					</div>

					{/* CENTER */}
					<div className=" flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto">
						{loading ? (
							<Loading />
						) : posts?.length > 0 ? (
							<MessageCountainer />
						) : (
							<div className="flex w-full h-full items-center justify-center">
								<p className="text-lg text-ascent-2">No Chat Available</p>
							</div>
						)}
					</div>

					{/* RIGHT */}
					<div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
						<FriendsCard friends={userInfo?.friends} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;

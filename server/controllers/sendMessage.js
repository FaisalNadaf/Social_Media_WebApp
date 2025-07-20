/** @format */

import Conversation from "../models/conersationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user.userId;
		// const  receiverId  = "686fd15f37c257737a2473c2";
		// const senderId = "6879e96bade29a42990d0f56";

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		await Promise.all([conversation.save(), newMessage.save()]);

		// socker io functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage conntroler", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	console.log("REQUEST RECEIVED", req);
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user.userId;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) {
			return res.status(201).json([]);
		}
		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessage conntroler", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

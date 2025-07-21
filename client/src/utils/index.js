/** @format */

import axios from "axios";
import { SetPosts } from "../redux/postSlice.js";

// const API_URL = "https://socialmediawebapp-0ypz.onrender.com";
const API_URL = "http://localhost:8800";

export const API = axios.create({
	baseURL: API_URL,
	responseType: "JSON",
});

export const apiRequest = async ({ url, token, data, method }) => {
	try {
		const result = await API(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
			method: method || "GET",
			data: data,
			withCredentials: true,
		});

		const newdata = result?.data;

		return JSON.parse(newdata);
		// return newdata;
	} catch (error) {
		// const err = error.data;
		console.log(error);
	}
};

// export const handelFileUpload = async (uploadFile) => {
//   const formData = new FormData();
//   formData.append("file", uploadFile);
//   formData.append("upload_present", "MEkMATE");

//   console.log(uploadFile);
//   console.log(formData);

//   try {
//     const cloudName = process.env.CLOUD_NAME; // Check if CLOUD_NAME is properly set

//     if (!cloudName) {
//       throw new Error("CLOUD_NAME environment variable is not set.");
//     }

//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`,
//       formData
//     );

//     console.log(response);

//     return response.data.secure_url;
//   } catch (error) {
//     console.error("Upload error:", error.message);
//     throw error; // Rethrow the error to handle it elsewhere
//   }
// };

export const handelFileUpload = async (uploadFile) => {
	try {
		const formData = new FormData();
		formData.append("file", uploadFile);
		formData.append("upload_preset", "MEkMATE"); // Corrected spelling of "upload_preset"

		console.log(uploadFile);
		console.log(formData);

		const cloudName = "dcacqhspd"; // Check if CLOUD_NAME is properly set
		console.log(cloudName);
		if (!cloudName) {
			throw new Error("CLOUD_NAME environment variable is not set.");
		}

		const response = await axios.post(
			`https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data", // Set content type explicitly for FormData
				},
			},
		);

		console.log(response.data.secure_url); // Log response data

		return response.data.secure_url;
	} catch (error) {
		console.error("Upload error:", error.message);
		throw error; // Rethrow the error to handle it elsewhere
	}
};

export const fetchPosts = async (token, dispatch, uri, data) => {
	try {
		const res = await apiRequest({
			url: uri || "/posts",
			token: token,
			data: data || {},
			method: "POST",
		});
		dispatch(SetPosts(res?.data));
		return;
	} catch (error) {
		console.log("error in fetch posts utils client :", error);
	}
};

export const likePost = async (token, uri) => {
	try {
		const res = await apiRequest({
			url: uri,
			token: token,
			method: "POST",
		});
		return res?.data;
	} catch (error) {
		console.log("error in like posts utils client :", error);
	}
};

export const deletePost = async (token, id) => {
	try {
		const res = await apiRequest({
			url: "/posts/" + id,
			token: token,
			method: "DELETE",
		});
		return res;
	} catch (error) {
		console.log("error in delete posts utils client :", error);
	}
};

export const getUserInfo = async (token, id) => {
	try {
		const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;

		const res = await apiRequest({
			url: uri,
			token: token,
			method: "POST",
		});

		if (res?.status == "Authentication failed") {
			localStorage.removeItem("user");
			window.alert("your session has expired");
			window.location.replace("/login");
		}
		return res?.user;
	} catch (error) {
		console.log("error in getUserInfo utils client :", error);
	}
};

export const sendFriendRequest = async (token, id) => {
	try {
		const res = await apiRequest({
			url: "/users/friend-request",
			token: token,
			method: "POST",
			data: { requestTo: id },
		});
		return;
	} catch (error) {
		console.log("error in sendFriendRequest utils client :", error);
	}
};

export const viewUserProfile = async ({ token, id }) => {
	try {
		const res = await apiRequest({
			url: "/users/profile-view",
			token: token,
			method: "POST",
			data: { id },
		});
		return;
	} catch (error) {
		console.log("error in viewUserProfile utils client :", error);
	}
};

/** @format */

import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;

	// Validate fields (FIXED: Logical error in condition)
	if (!firstName || !lastName || !email || !password) {
		return next("All fields are required!"); // Use `return` to exit early
	}

	try {
		// Check if user already exists
		const userExist = await Users.findOne({ email });
		if (userExist) {
			return next("Email already exists"); // Use `return` to exit early
		}

		// Hash password
		const hashedPassword = await hashString(password);

		// Create user
		const user = await Users.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		// Send verification email
		await sendVerificationEmail(user, res); // Add `await` to handle errors properly
	} catch (error) {
		console.error("Registration error:", error); // Better error logging
		next(error.message || "Registration failed"); // Forward error to error handler
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		//validation
		if (!email || !password) {
			next("Please Provide User Credentials");
			return;
		}

		// find user by email
		const user = await Users.findOne({ email }).select("+password").populate({
			path: "friends",
			select: "firstName lastName location profileUrl -password",
		});

		if (!user) {
			next("Invalid email or password");
			return;
		}

		if (!user?.verified) {
			next(
				"User email is not verified. Check your email account and verify your email",
			);
			return;
		}

		// compare password
		const isMatch = await compareString(password, user?.password);

		if (!isMatch) {
			next("Invalid email or password");
			return;
		}

		user.password = undefined;

		const token = createJWT(user?._id);

		res.status(201).json({
			success: true,
			message: "Login successfully",
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

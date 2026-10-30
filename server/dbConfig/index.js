/** @format */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000, // ✅ Optional: Prevent long wait times
			connectTimeoutMS: 10000, // ✅ Optional: Prevent connection hang
		});

		console.log("✅ DB Connected Successfully");
	} catch (error) {
		console.error("❌ DB Connection Error:", error.message);
		process.exit(1); // ✅ Exit process if DB fails to connect
	}
};

export default dbConnection;

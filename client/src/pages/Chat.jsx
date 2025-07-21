/** @format */

import { FriendsCard, ProfileCard, TopBar } from "../components";
import MessageCountainer from "../components/messages/MessageCountainer";

const Chat = () => {
	const userInfo = JSON.parse(localStorage.getItem("user"));

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
					<div className=" flex-1 h-full bg-orimary px-4 flex flex-col gap-6 overflow-y-auto">
						<MessageCountainer />
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

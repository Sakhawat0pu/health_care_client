"use client";
import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { Box, Button, Stack } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth.services";

const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
	const [videoCall, setVideoCall] = useState(false);
	const router = useRouter();
	const userRole = getUserInfo().role;
	const rtcProps = {
		appId: process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
		channel: videoCallingId, // your agora channel
		token: null, // use null or skip if using app in testing mode
	};
	const callbacks = {
		EndCall: () => {
			setVideoCall(false);
			router.push(`/dashboard/${userRole}/appointments`);
		},
	};
	return videoCall ? (
		<div
			style={{
				display: "flex",
				width: "100vw",
				height: "100vh",
			}}
		>
			<AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
		</div>
	) : (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			gap={{ xs: 5, md: 10 }}
			mt={{ xs: 2, md: 5 }}
		>
			<Button
				onClick={() => setVideoCall(true)}
				endIcon={<VideoCallIcon />}
				sx={{ borderRadius: 5.5, fontWeight: 600 }}
			>
				Start Video Call
			</Button>
			<Image
				src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
				width={500}
				height={500}
				alt="video call gif"
			/>
		</Stack>
	);
};

export default VideoCall;

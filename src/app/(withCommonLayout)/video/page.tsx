import VideoCall from "@/components/UI/VideoCall/VideoCall";

const VideoCallingPage = ({
	searchParams,
}: {
	searchParams: Record<string, string>;
}) => {
	const videoCallingId = searchParams?.videoCallingId;

	return <VideoCall videoCallingId={videoCallingId} />;
};

export default VideoCallingPage;

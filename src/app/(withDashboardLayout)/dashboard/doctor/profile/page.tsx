"use client";
import {
	useGetMyselfQuery,
	useUpdateMyProfileMutation,
} from "@/redux/api/myInfoApi";
import {
	Box,
	Button,
	Container,
	Stack,
	Typography,
	styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import blank_profile_img from "@/assets/blank_profile_img.webp";
import FileUploader from "@/components/FileUploader/FileUploader";
import { toast } from "sonner";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import DoctorProfileUploadModal from "./components/DoctorProfileUploadModal";
import EditIcon from "@mui/icons-material/Edit";

const StyledBox = styled(Box)(({ theme }) => ({
	background: "#f4f7fe",
	borderRadius: theme.spacing(1),
	padding: "8px 16px",
	width: "45%",
	"& p": {
		fontWeight: 600,
	},
}));

const DoctorProfilePage = () => {
	const { data, isLoading } = useGetMyselfQuery({});
	const [open, setOpen] = useState<boolean>(false);
	const [updateMyProfile, { isLoading: uploading }] =
		useUpdateMyProfileMutation();

	const onFileUpload = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("data", JSON.stringify({}));
		try {
			const res = await updateMyProfile(formData).unwrap();
			if (res.id) {
				toast.success("Image uploaded successfully");
			}
		} catch (err) {
			console.error(err);
		}
	};

	if (isLoading) {
		return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
	}
	return (
		<>
			<DoctorProfileUploadModal open={open} setOpen={setOpen} data={data} />
			<Container>
				<Grid container spacing={5} pt={5}>
					<Grid xs={12} md={4}>
						<Box
							sx={{
								width: "100%",
								height: 400,
								overflow: "hidden",
								borderRadius: 1,
							}}
						>
							<Image
								src={
									data?.profilePhoto ? data?.profilePhoto : blank_profile_img
								}
								alt="profile photo"
								width={500}
								height={400}
							/>
						</Box>
						<Box mt={1}>
							{uploading ? (
								<Box sx={{ width: "100%" }}>
									<LinearProgress />
								</Box>
							) : (
								<FileUploader
									name="file"
									label="Upload Profile Image"
									variant="text"
									onFileUpload={onFileUpload}
								/>
							)}
						</Box>
						<Box mt={2}>
							<Button
								onClick={() => setOpen(true)}
								fullWidth
								endIcon={<EditIcon />}
							>
								Edit Profile
							</Button>
						</Box>
					</Grid>
					<Grid xs={12} md={8}>
						<Typography variant="h4" component="h4" color="primary.main" mb={2}>
							Personal Information
						</Typography>
						<Stack
							direction={{ xs: "column", md: "row" }}
							flexWrap="wrap"
							gap={2}
							mb={5}
						>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Name
								</Typography>
								<Typography>{data.name}</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Email
								</Typography>
								<Typography>{data.email}</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Contact No.
								</Typography>
								<Typography>{data.contactNumber}</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Role
								</Typography>
								<Typography>
									{data.role.substring(0, 1)}
									{data.role.substring(1).toLowerCase()}
								</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Gender
								</Typography>
								<Typography>
									{data.gender.substring(0, 1)}
									{data.gender.substring(1).toLowerCase()}
								</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Designation
								</Typography>
								<Typography>{data.designation}</Typography>
							</StyledBox>
						</Stack>
						<Typography variant="h4" component="h4" color="primary.main" mb={2}>
							Professional Information
						</Typography>
						<Stack
							direction={{ xs: "column", md: "row" }}
							flexWrap="wrap"
							gap={2}
						>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Qualification
								</Typography>
								<Typography>{data.qualification}</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Registration No.
								</Typography>
								<Typography>{data.registrationNumber}</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Current Work Place
								</Typography>
								<Typography>{data.currentWorkingPlace}</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Appointment Fee
								</Typography>
								<Typography>{data.appointmentFee}</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Average Rating
								</Typography>
								<Typography>{data.averageRating}</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Status
								</Typography>
								<Typography>
									{data.status.substring(0, 1)}
									{data.status.substring(1).toLowerCase()}
								</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="caption" color="secondary">
									Experience
								</Typography>
								<Typography>{data.experience} year(s)</Typography>
							</StyledBox>
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default DoctorProfilePage;

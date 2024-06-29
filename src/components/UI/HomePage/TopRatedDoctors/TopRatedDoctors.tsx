import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import Image from "next/image";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import Link from "next/link";

const TopRatedDoctors = async () => {
	const res = await fetch(
		"http://localhost:5555/api/v1/doctor?page=1&limit=3",
		{
			next: {
				revalidate: 30,
			},
		}
	);

	const { data: doctors } = await res.json();
	return (
		<Box
			sx={{
				my: 5,
				py: 30,
				backgroundColor: "rgba(20, 20, 20, 0.1)",
				clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
			}}
		>
			<Box sx={{ textAlign: "center" }}>
				<Typography variant="h4" component="h1" fontWeight={600}>
					Our Top Rated Doctors
				</Typography>
				<Typography
					component="h1"
					fontWeight={400}
					fontSize={18}
					color="gray"
					mt={2}
				>
					Access to expert physicians and surgeons, advanced technologies
				</Typography>
				<Typography component="h1" fontWeight={400} fontSize={18} color="gray">
					and top quality surgery faculties right here.
				</Typography>
			</Box>
			<Container sx={{ margin: "30px auto" }}>
				<Grid container spacing={4}>
					{doctors.map((doctor: any) => (
						<Grid item key={doctor.id} md={4}>
							<Card>
								<Box
								// sx={{
								// 	width: "100%",
								// 	height: "300px",
								// 	"& img": {
								// 		width: "100%",
								// 		height: "100%",
								// 		overflow: "hidden",
								// 		objectFit: "cover",
								// 	},
								// }}
								>
									{doctor.profilePhoto && (
										<Image
											src={doctor.profilePhoto}
											alt="doctor image"
											width={500}
											height={500}
										/>
									)}
								</Box>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										Dr. {doctor.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{doctor.qualification} - {doctor.designation}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										pt={1}
										alignItems="center"
									>
										<LocalHospitalOutlinedIcon /> {doctor.currentWorkingPlace}
									</Typography>
								</CardContent>
								<CardActions
									sx={{ justifyContent: "center", paddingBottom: "20px" }}
								>
									<Button sx={{ marginRight: "20px" }}>Book Now</Button>
									<Link href={`/doctors/${doctor.id}`}>
										<Button variant="outlined">View Profile</Button>
									</Link>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
				<Box sx={{ textAlign: "center" }}>
					<Link href="/doctors">
						<Button variant="outlined" sx={{ mt: 5 }}>
							View All
						</Button>
					</Link>
				</Box>
			</Container>
		</Box>
	);
};

export default TopRatedDoctors;

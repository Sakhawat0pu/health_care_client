import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import Image from "next/image";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import ScrollDoctorsCategory from "./components/ScrollDoctorsCategory";
import Link from "next/link";

const AllDoctorsPage = async ({
	searchParams,
}: {
	searchParams: Record<string, any>;
}) => {
	const specialties = searchParams?.specialties;
	const url = specialties
		? `http://localhost:5555/api/v1/doctor?specialties=${specialties}`
		: "http://localhost:5555/api/v1/doctor";
	const res = await fetch(url, {
		next: {
			revalidate: 30,
		},
	});

	const { data: doctors } = await res.json();

	return (
		<Box
			sx={{
				my: 5,
			}}
		>
			<Box sx={{ textAlign: "center" }}>
				<Typography variant="h4" component="h1" fontWeight={600}>
					Meet Our Doctors
				</Typography>
			</Box>

			<Container sx={{ my: 4 }}>
				<ScrollDoctorsCategory specialty={specialties ?? "all"} />
				{doctors.length ? (
					<Grid container spacing={4}>
						{doctors.map((doctor: any) => (
							<Grid item key={doctor.id} md={4}>
								<Card>
									<Box
										sx={{
											width: "100%",
											height: "350px",
											"& img": {
												width: "100%",
												height: "100%",
												overflow: "hidden",
												objectFit: "cover",
											},
										}}
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
										{doctor?.doctorSpecialties.length > 0 ? (
											<Typography variant="body2" color="text.secondary" pt={1}>
												Specializes in{" "}
												{doctor?.doctorSpecialties
													.map(
														(specialties: any) => specialties.specialties.title
													)
													.join(", ")}
											</Typography>
										) : null}
										<Typography
											variant="body2"
											color="text.secondary"
											pt={1}
											alignItems="center"
										>
											<LocalHospitalOutlinedIcon /> {doctor.currentWorkingPlace}
										</Typography>

										<Typography
											variant="h6"
											component="h6"
											pt={1}
											fontSize={18}
											fontWeight={600}
											color="text.secondary"
										>
											Experience: {doctor.experience}+ years
										</Typography>
										<Typography
											variant="h6"
											component="h6"
											color="primary.main"
											marginTop={2}
										>
											Appointment Fee: ${doctor.appointmentFee}
										</Typography>
										<Typography component="small" color="lightgray">
											per appointment
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
				) : (
					<Stack
						direction={"row"}
						justifyContent="center"
						alignItems="center"
						height="50vh"
					>
						<Typography variant="h5" component="h5" color="red">
							Sorry! No Doctors Available For This Specialty
						</Typography>
					</Stack>
				)}
			</Container>
		</Box>
	);
};

export default AllDoctorsPage;

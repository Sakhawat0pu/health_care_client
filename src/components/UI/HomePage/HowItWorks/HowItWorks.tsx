import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import doctorImg from "@/assets/how-it-works-img.png";
import searchIcon from "@/assets/icons/search-icon.png";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import charityIcon from "@/assets/icons/charity-icon.png";
import appointmentIcon from "@/assets/icons/appointment-icon.png";

const HowItWorksPage = () => {
	return (
		<Container sx={{ mt: "100px", mb: "100px" }}>
			<Box sx={{ mb: "80px" }}>
				<Box sx={{ mb: "60px" }}>
					<Typography component="p" color="primary.main" fontWeight={300}>
						How It Works
					</Typography>
					<Typography variant="h4" component="h4" fontWeight={600}>
						4 Easy Steps to Get Your Solutions
					</Typography>
					<Typography component="p" color="gray" fontWeight={300}>
						Access to expert physicians and surgeons, advanced technologies
					</Typography>
					<Typography component="p" color="gray" fontWeight={300}>
						and top quality surgery faculty
					</Typography>
				</Box>
				<Box>
					<Grid container spacing={2}>
						<Grid item md={6}>
							{doctorImg && (
								<Image src={doctorImg} alt="doctor image" width={720}></Image>
							)}
						</Grid>
						<Grid item md={6} sx={{ pt: "10px" }}>
							<Grid container spacing={2}>
								<Grid item md={6}>
									<Box
										sx={{
											border: "1px solid gray",
											borderRadius: "10px",
											padding: "25px",
										}}
									>
										{searchIcon && (
											<Image
												src={searchIcon}
												alt="search icon"
												width={50}
												height={50}
											/>
										)}
										<Box mt={3}>
											<Typography variant="h5" component="h5" fontWeight={400}>
												Search Doctor
											</Typography>
											<Typography
												component="p"
												fontWeight={300}
												color="gray"
												sx={{ mt: "10px" }}
											>
												Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Similique magni debitis aspernatur tempore fugit
												ipsa recusandae molestias soluta ratione ab!
											</Typography>
										</Box>
									</Box>
								</Grid>
								<Grid item md={6}>
									<Box
										sx={{
											border: "1px solid gray",
											borderRadius: "10px",
											padding: "25px",
										}}
									>
										{doctorIcon && (
											<Image
												src={doctorIcon}
												alt="doctor icon"
												width={50}
												height={50}
											/>
										)}
										<Box mt={3}>
											<Typography variant="h5" component="h5" fontWeight={400}>
												Check Doctor Profile
											</Typography>
											<Typography
												component="p"
												fontWeight={300}
												color="gray"
												sx={{ mt: "10px" }}
											>
												Lorem, ipsum dolor sit amet consectetur adipisicing
												elit. Recusandae cum rem magnam aliquam reprehenderit
												velit maiores illum eius ullam. Quae.
											</Typography>
										</Box>
									</Box>
								</Grid>
								<Grid item md={6}>
									<Box
										sx={{
											border: "1px solid gray",
											borderRadius: "10px",
											padding: "25px",
										}}
									>
										{appointmentIcon && (
											<Image
												src={appointmentIcon}
												alt="appointment icon"
												width={50}
												height={50}
											/>
										)}
										<Box mt={3}>
											<Typography variant="h5" component="h5" fontWeight={400}>
												Schedule Appointment
											</Typography>
											<Typography
												component="p"
												fontWeight={300}
												color="gray"
												sx={{ mt: "10px" }}
											>
												Lorem, ipsum dolor sit amet consectetur adipisicing
												elit. Recusandae cum rem magnam aliquam reprehenderit
												velit maiores illum eius ullam. Quae.
											</Typography>
										</Box>
									</Box>
								</Grid>
								<Grid item md={6}>
									<Box
										sx={{
											border: "1px solid gray",
											borderRadius: "10px",
											padding: "25px",
										}}
									>
										{charityIcon && (
											<Image
												src={charityIcon}
												alt="charity icon"
												width={50}
												height={50}
											/>
										)}
										<Box mt={3}>
											<Typography variant="h5" component="h5" fontWeight={400}>
												Get Your Solution
											</Typography>
											<Typography
												component="p"
												fontWeight={300}
												color="gray"
												sx={{ mt: "10px" }}
											>
												Lorem, ipsum dolor sit amet consectetur adipisicing
												elit. Recusandae cum rem magnam aliquam reprehenderit
												velit maiores illum eius ullam. Quae.
											</Typography>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Box
				sx={{
					backgroundImage: "linear-gradient(to right, blue, #164cfa, #118dfa)",
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					padding: "60px 20px",
					borderRadius: "20px",
					textAlign: "center",
				}}
			>
				<Box>
					<Typography
						variant="h2"
						component="h2"
						color="white"
						fontWeight={500}
					>
						180+
					</Typography>
					<Typography
						variant="h5"
						component="h5"
						color="white"
						fontWeight={500}
					>
						Expert Doctors
					</Typography>
				</Box>
				<Box>
					<Typography
						variant="h2"
						component="h2"
						color="white"
						fontWeight={500}
					>
						26+
					</Typography>
					<Typography
						variant="h5"
						component="h5"
						color="white"
						fontWeight={500}
					>
						Expert Services
					</Typography>
				</Box>
				<Box>
					<Typography
						variant="h2"
						component="h2"
						color="white"
						fontWeight={500}
					>
						10K+
					</Typography>
					<Typography
						variant="h5"
						component="h5"
						color="white"
						fontWeight={500}
					>
						Happy Patients
					</Typography>
				</Box>
				<Box>
					<Typography
						variant="h2"
						component="h2"
						color="white"
						fontWeight={500}
					>
						150+
					</Typography>
					<Typography
						variant="h5"
						component="h5"
						color="white"
						fontWeight={500}
					>
						Best Award Winners
					</Typography>
				</Box>
			</Box>
		</Container>
	);
};

export default HowItWorksPage;

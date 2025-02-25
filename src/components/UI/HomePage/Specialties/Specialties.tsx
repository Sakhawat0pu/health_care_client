import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type TSpecialty = {
	id: string;
	title: string;
	icon: string;
};

const Specialties = async () => {
	const res = await fetch("http://localhost:5555/api/v1/specialties", {
		next: {
			revalidate: 30,
		},
	});
	const { data: specialties } = await res.json();

	return (
		<Container>
			<Box sx={{ margin: "40px 0px", textAlign: "center" }}>
				<Box sx={{ textAlign: "start" }}>
					<Typography variant="h4" component="h1" fontWeight={600}>
						Explore Treatments Across Specialties
					</Typography>
					<Typography component="p" fontWeight={400} fontSize={18} color="gray">
						Find doctors across all Specialties
					</Typography>
				</Box>
				<Stack direction="row" gap={5} marginTop={5} alignContent="center">
					{specialties.slice(0, 6).map((specialty: TSpecialty) => (
						<Box
							component={Link}
							href={`/doctors?specialties=${specialty.title}`}
							key={specialty.id}
							sx={{
								flex: 1,
								width: "150px",
								backgroundColor: "rgba(245, 245, 245, 1)",
								border: "1px solid rgba(250, 250, 250, 1)",
								borderRadius: "10px",
								padding: "40px 10px",
								textAlign: "center",
								textDecoration: "none",
								"& img": {
									width: "50px",
									height: "50px",
									margin: "0 auto",
								},
								"&:hover": {
									border: "1px solid blue",
									padding: "40px 10px",
									borderRadius: "10px",
								},
							}}
						>
							{specialty.icon && (
								<Image
									src={specialty.icon}
									width={100}
									height={100}
									alt="Specialty icon"
								/>
							)}
							<Box>
								<Typography component="p" fontWeight={500} fontSize={18} mt={2}>
									{specialty.title}
								</Typography>
							</Box>
						</Box>
					))}
				</Stack>
				<Button variant="outlined" sx={{ mt: 5 }}>
					View All
				</Button>
			</Box>
		</Container>
	);
};

export default Specialties;

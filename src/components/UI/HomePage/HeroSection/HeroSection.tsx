import assets from "@/assets";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";

const HeroSectionPage = () => {
	return (
		<Container
			sx={{
				display: "flex",
				my: 18,
			}}
		>
			<Box
				sx={{
					flex: 1,
					position: "relative",
				}}
			>
				<Box sx={{ position: "absolute", top: "-90px", left: "-100px" }}>
					<Image src={assets.svgs.grid} alt="grid"></Image>
				</Box>
				<Typography variant="h2" component="h1" fontWeight={600}>
					Healthier Hearts
				</Typography>
				<Typography variant="h2" component="h1" fontWeight={600}>
					Come From
				</Typography>
				<Typography
					color="primary.main"
					variant="h2"
					component="h1"
					fontWeight={600}
				>
					Preventive Care
				</Typography>
				<Typography
					variant="h6"
					component="p"
					fontWeight={300}
					sx={{ width: "90%", my: 2 }}
					color="grey"
				>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita,
					eveniet facilis non, necessitatibus quibusdam hic earum a cum sit
					voluptatum distinctio? Dolores accusamus.
				</Typography>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Button>Make Appointment</Button>
					<Button variant="outlined">Contact Us</Button>
				</Box>
			</Box>
			<Box
				sx={{
					p: 1,
					flex: 1,
					display: "flex",
					justifyContent: "center",
					position: "relative",
					top: 0,
				}}
			>
				<Box sx={{ position: "absolute", top: "-30px", left: "295px" }}>
					<Image src={assets.svgs.arrow} width={100} height={100} alt="arrow" />
				</Box>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Box mt={4}>
						{assets.images.doctor1 && (
							<Image
								src={assets.images.doctor1}
								width={240}
								height={380}
								alt="doctor1"
							/>
						)}
					</Box>
					<Box>
						{assets.images.doctor2 && (
							<Image
								src={assets.images.doctor2}
								width={240}
								height={350}
								alt="doctor2"
							/>
						)}
					</Box>
				</Box>
				<Box
					sx={{
						position: "absolute",
						top: "230px",
						left: "240px",
					}}
				>
					{assets.images.doctor3 && (
						<Image
							src={assets.images.doctor3}
							alt="doctor3"
							width={250}
							height={250}
						/>
					)}
				</Box>
				<Box
					sx={{
						position: "absolute",
						bottom: "-40px",
						right: "80px",
						zIndex: -1,
					}}
				>
					{assets.images.stethoscope && (
						<Image
							src={assets.images.stethoscope}
							alt="doctor3"
							width={180}
							height={180}
						/>
					)}
				</Box>
			</Box>
		</Container>
	);
};

export default HeroSectionPage;

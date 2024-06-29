import assets from "@/assets";
import { Box, Container, Grid, Typography } from "@mui/material";
import chooseUs from "@/assets/choose-us.png";
import Image from "next/image";
const servicesData = [
	{
		imageSrc: assets.svgs.award,
		title: "Award Wining Services",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, ipsam vero hic veniam officiis alias",
	},
	{
		imageSrc: assets.svgs.award,
		title: "Best Quality Pregnancy Care",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, ipsam vero hic veniam officiis alias",
	},
	{
		imageSrc: assets.svgs.award,
		title: "Complete Medical Equipment",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, ipsam vero hic veniam officiis alias",
	},
	{
		imageSrc: assets.svgs.award,
		title: "Dedicated Emergency Care",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, ipsam vero hic veniam officiis alias",
	},
];

const WhyUs = () => {
	return (
		<Container sx={{ mb: "25px" }}>
			<Box>
				<Box textAlign="center" mb={5}>
					<Typography
						variant="h5"
						component="h3"
						fontWeight={700}
						color="primary.main"
					>
						Why Us
					</Typography>
					<Typography variant="h4" component="h2" fontWeight={700}>
						Why Choose Us
					</Typography>
				</Box>
			</Box>
			<Grid container spacing={5}>
				<Grid item md={6}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "15px",
							backgroundColor: "rgba(245, 245, 245, 1)",
							padding: "20px",
							borderRadius: "10px 10px 100px 10px",
							mb: "20px",
						}}
					>
						<Box
							sx={{
								backgroundColor: "white",
								padding: "10px",
								borderRadius: "10px",
							}}
						>
							{servicesData[0].imageSrc && (
								<Image
									src={servicesData[0].imageSrc}
									alt="award"
									width={50}
								></Image>
							)}
						</Box>
						<Box>
							<Typography variant="h6" component="h6" fontWeight={600}>
								{servicesData[0].title}
							</Typography>
							<Typography
								variant="body2"
								color="primary.body1"
								fontWeight={300}
							>
								{servicesData[0].description}
							</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "15px",
							backgroundColor: "rgba(245, 245, 245, 1)",
							padding: "20px",
							borderRadius: "10px 100px 10px 10px",
							mb: "20px",
						}}
					>
						<Box
							sx={{
								backgroundColor: "white",
								padding: "10px",
								borderRadius: "10px",
							}}
						>
							{servicesData[1].imageSrc && (
								<Image
									src={servicesData[1].imageSrc}
									alt="Care"
									width={50}
								></Image>
							)}
						</Box>
						<Box>
							<Typography variant="h6" component="h6" fontWeight={600}>
								{servicesData[1].title}
							</Typography>
							<Typography
								variant="body2"
								color="primary.body1"
								fontWeight={300}
							>
								{servicesData[1].description}
							</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "15px",
							backgroundColor: "rgba(245, 245, 245, 1)",
							padding: "20px",
							borderRadius: "10px 10px 100px 10px",
							mb: "20px",
						}}
					>
						<Box
							sx={{
								backgroundColor: "white",
								padding: "10px",
								borderRadius: "10px",
							}}
						>
							{servicesData[2].imageSrc && (
								<Image
									src={servicesData[2].imageSrc}
									alt="Equipment"
									width={50}
								></Image>
							)}
						</Box>
						<Box>
							<Typography variant="h6" component="h6" fontWeight={600}>
								{servicesData[2].title}
							</Typography>
							<Typography
								variant="body2"
								color="primary.body1"
								fontWeight={300}
							>
								{servicesData[2].description}
							</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "15px",
							backgroundColor: "rgba(245, 245, 245, 1)",
							padding: "20px",
							borderRadius: "10px 100px 10px 10px",
						}}
					>
						<Box
							sx={{
								backgroundColor: "white",
								padding: "10px",
								borderRadius: "10px",
							}}
						>
							{servicesData[3].imageSrc && (
								<Image
									src={servicesData[3].imageSrc}
									alt="emergency care"
									width={50}
								></Image>
							)}
						</Box>
						<Box>
							<Typography variant="h6" component="h6" fontWeight={600}>
								{servicesData[3].title}
							</Typography>
							<Typography
								variant="body2"
								color="primary.body1"
								fontWeight={300}
							>
								{servicesData[3].description}
							</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item md={6}>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Image src={chooseUs} alt="choose us image" width={418}></Image>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default WhyUs;

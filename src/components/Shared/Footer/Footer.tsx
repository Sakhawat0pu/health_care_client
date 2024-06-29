import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedInIcon from "@/assets/landing_page/linkedin.png";
import Image from "next/image";

const Footer = () => {
	return (
		<Box bgcolor="rgb(17, 26, 34)" py={5}>
			<Container>
				<Stack direction="row" gap={10} justifyContent="center">
					<Typography component={Link} href="/consultation" color="#ffffff">
						Consultation
					</Typography>
					<Typography component={Link} href="/login" color="#ffffff">
						Health Plans
					</Typography>
					<Typography component={Link} href="/login" color="#ffffff">
						Medicine
					</Typography>
					<Typography component={Link} href="/login" color="#ffffff">
						Diagnostic
					</Typography>
					<Typography component={Link} href="/login" color="#ffffff">
						NGOs
					</Typography>
				</Stack>
				<Stack py={4} direction="row" justifyContent="center" gap={3}>
					<Image
						src={facebookIcon}
						alt="facebook icon"
						width={40}
						height={40}
					></Image>
					<Image
						src={instagramIcon}
						alt="instagram icon"
						width={40}
						height={40}
					></Image>
					<Image
						src={twitterIcon}
						alt="twitter icon"
						width={40}
						height={40}
					></Image>
					<Image
						src={linkedInIcon}
						alt="linkedin icon"
						width={40}
						height={40}
					></Image>
				</Stack>
				{/* <div className="border-b-[1px] border-dashed"></div> */}
				<Box sx={{ border: "1px dashed lightgray" }}></Box>
				<Stack
					py={4}
					direction="row"
					justifyContent="space-between"
					spacing={2}
					alignItems="center"
				>
					<Typography color="white" component="p">
						&copy; 2024 Health Care. All rights reserved
					</Typography>
					<Typography
						variant="h3"
						component={Link}
						href="/"
						fontWeight={600}
						color="white"
					>
						<Box component="span" color="primary.main">
							H
						</Box>
						ealth{" "}
						<Box component="span" color="primary.main">
							C
						</Box>
						are
					</Typography>
					<Typography color="white" component="p">
						Privacy Policy! Terms & Conditions
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;

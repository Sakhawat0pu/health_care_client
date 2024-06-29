import HeroSectionPage from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWorksPage from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import Specialties from "@/components/UI/HomePage/Specialties/Specialties";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";

const HomePage = () => {
	return (
		<>
			<HeroSectionPage />
			<Specialties />
			<TopRatedDoctors />
			<WhyUs />
			<HowItWorksPage />
		</>
	);
};

export default HomePage;

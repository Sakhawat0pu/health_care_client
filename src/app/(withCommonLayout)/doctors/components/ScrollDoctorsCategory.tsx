"use client";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const ScrollDoctorsCategory = ({ specialty }: { specialty: string }) => {
	const router = useRouter();
	const { data } = useGetAllSpecialtiesQuery({});
	const [value, setValue] = useState(specialty);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (value === "all") {
			router.push(`/doctors`);
		} else {
			router.push(`/doctors?specialties=${value}`);
		}
	}, [value]);

	return (
		<Box sx={{ maxWidth: "100%", bgcolor: "background.paper", mb: 4 }}>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example"
			>
				<Tab key={1} label="All" value={"all"} sx={{ fontWeight: 600 }} />
				{data?.map((item: Record<string, any>) => (
					<Tab
						key={item.id}
						label={item.title}
						value={item.title}
						sx={{ fontWeight: 600 }}
					/>
				))}
			</Tabs>
		</Box>
	);
};

export default ScrollDoctorsCategory;

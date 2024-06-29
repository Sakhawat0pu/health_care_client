const SpecialtyPage = async ({ params }: { params: Record<string, any> }) => {
	const specialtyId = params.specialtyId;

	const res = await fetch(
		`http://localhost:5555/api/v1/specialties/${specialtyId}`,
		{
			next: {
				revalidate: 30,
			},
		}
	);

	const data = await res.json();

	console.log(data);
	return (
		<div>
			<h1>This is SpecialtyPage component: {specialtyId}</h1>
		</div>
	);
};

export default SpecialtyPage;

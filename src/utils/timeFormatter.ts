export const timeFormatter = (date: Date) => {
	const hour = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	const formattedTime = `${hour}:${minutes}`;

	return formattedTime;
};

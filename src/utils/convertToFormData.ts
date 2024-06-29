import { FieldValues } from "react-hook-form";

export const convertToFormData = (payload: FieldValues) => {
	const data = { ...payload };
	const file = data["file"];
	delete data["file"];
	const stringifiedData = JSON.stringify(data);
	const formData = new FormData();
	formData.append("data", stringifiedData);

	if (file) {
		formData.append("file", file as Blob);
	}
	return formData;
};

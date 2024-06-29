import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TMeta = {
	page: number;
	limit: number;
	totalDocuments: number;
	totalPages: number;
};

export type TUserRole = keyof typeof USER_ROLE;

export type TDrawerItem = {
	title: string;
	path: string;
	parentPath?: string;
	icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
	child?: TDrawerItem[];
};

export type TSuccessResponse = {
	data: any;
	meta?: TMeta;
};

export type TErrorResponse = {
	statusCode: number;
	message: string;
	errorMessages: string;
};

export type TErrorMessage = {
	path: string | number;
	message: string;
};

export type TSchedule = {
	id: string;
	startDateTime: Date;
	endDateTime: Date;
};

export type TFormattedSchedule = {
	id: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
};

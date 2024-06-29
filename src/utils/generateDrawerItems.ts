import { USER_ROLE } from "@/constants/role";
import { TDrawerItem, TUserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ReviewsIcon from "@mui/icons-material/Reviews";
import MedicationIcon from "@mui/icons-material/Medication";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export const generateDrawerItems = (role: TUserRole): TDrawerItem[] => {
	const drawerItems: TDrawerItem[] = [];
	const commonItems: TDrawerItem[] = [
		{
			title: "Profile",
			path: `${role}/profile`,
			icon: AccountBoxIcon,
		},
		{
			title: "Change Password",
			path: "change-password",
			icon: VpnKeyIcon,
		},
	];

	switch (role) {
		case USER_ROLE.SUPER_ADMIN:
			drawerItems.push(
				{
					title: "Dashboard",
					path: role,
					icon: DashboardIcon,
				},
				{
					title: "Manage Users",
					path: `${role}/manage-users`,
					icon: GroupIcon,
				}
			);
			break;
		case USER_ROLE.ADMIN:
			drawerItems.push(
				{
					title: "Dashboard",
					path: role,
					icon: DashboardIcon,
				},
				{
					title: "Specialties",
					path: `${role}/specialties`,
					icon: VaccinesIcon,
				},
				{
					title: "Doctors",
					path: `${role}/doctors`,
					icon: MedicalInformationIcon,
				},
				{
					title: "Schedules",
					path: `${role}/schedules`,
					icon: CalendarMonthIcon,
				},
				{
					title: "Appointments",
					path: `${role}/appointments`,
					icon: BookOnlineIcon,
				},
				{
					title: "Reviews",
					path: `${role}/reviews`,
					icon: ReviewsIcon,
				}
			);
			break;
		case USER_ROLE.DOCTOR:
			drawerItems.push(
				{
					title: "Dashboard",
					path: role,
					icon: DashboardIcon,
				},
				{
					title: "Schedules",
					path: `${role}/schedules`,
					icon: CalendarMonthIcon,
				},
				{
					title: "Appointments",
					path: `${role}/appointments`,
					icon: BookOnlineIcon,
				}
			);
			break;
		case USER_ROLE.PATIENT:
			drawerItems.push(
				{
					title: "Appointments",
					path: `${role}/appointments`,
					icon: BookOnlineIcon,
				},
				{
					title: "Prescription",
					path: `${role}/prescription`,
					icon: MedicationIcon,
				},
				{
					title: "Payment History",
					path: `${role}/payment-history`,
					icon: PaymentsIcon,
				}
			);
			break;
		default:
			break;
	}
	return [...drawerItems, ...commonItems];
};

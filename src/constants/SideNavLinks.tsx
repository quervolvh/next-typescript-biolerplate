import { DashboardSvg, CustomersIcon, LogsIcon, DocumentsIcon, NotificationsIcon, CardsIcon, SettingsIcon } from 'components';

export const SIDENAVLINKS: {
    title: string,
    link: string,
    icon: string
}[] = [
        {
            title: "Dashboard",
            link: "/dashboard",
            icon: DashboardSvg,
        },
        {
            title: "Customers",
            link: "/customers",
            icon: CustomersIcon
        },
        {
            title: "Audit logs",
            link: "/audit",
            icon: LogsIcon
        },
        {
            title: "Approve Documents",
            link: "/documents",
            icon: DocumentsIcon
        },
        {
            title: "Notification Manager",
            link: "/notifications",
            icon: NotificationsIcon
        },
        {
            title: "Card Manager",
            link: "/cards",
            icon: CardsIcon
        },
        {
            title: "Settings",
            link: "/settings",
            icon: SettingsIcon
        }

    ];

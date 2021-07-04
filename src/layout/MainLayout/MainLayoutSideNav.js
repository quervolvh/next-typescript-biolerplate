import React from 'react';
import Link from 'next/link';
import StellasIcon from 'assets/svg/stellas.svg';
import DashboardIcon from 'assets/svg/Home.svg';
import TransactionsIcon from 'assets/svg/transactions.svg';
import CardsIcon from 'assets/svg/cards.svg';
import SettingsIcon from 'assets/svg/settings.svg';

const content = [
    {
        title: "Dashboard",
        link: "/onboarding",
        icon: DashboardIcon,
    },
    {
        title: "Transactions",
        link: "/transactions",
        icon: TransactionsIcon
    },
    {
        title: "Cards",
        link: "/cards",
        icon: CardsIcon
    },
    {
        title: "Settings",
        link: "/settings",
        icon: SettingsIcon
    },
];

const MainLayoutSideNav = ({ active }) => {
    return (
        <div className="mainLayout-sideNav">
            <div className="mainLayout-sideNav-company">

                <div className="mainLayout-sideNav-company-box">
                    <StellasIcon />
                </div>

            </div>
            <div className="mainLayout-sideNav-content">
                {content.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            className="mainLayout-sideNav-field"
                            key={`side-nav-item-${index}`}>
                            <Link href={item.link}>
                                <a
                                    className={(active === String(item.title).toLowerCase()) ? 'active' : ''}
                                    role="button">
                                    <div className='bulb'>
                                        <Icon />
                                    </div>
                                    <span> {item.title} </span>
                                </a>
                            </Link>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default MainLayoutSideNav;

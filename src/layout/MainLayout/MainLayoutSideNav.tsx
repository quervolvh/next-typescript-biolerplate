import React from 'react';
import Link from 'next/link';
import { SIDENAVLINKS } from 'constants/index';
import { classnames } from 'utils';

const MainLayoutSideNav: React.FC<{ active?: string }> = ({ active }) => {

    return (
        <div className="main-layout-sideNav">
            <div className="main-layout-sideNav-company">

                <div className="main-layout-sideNav-company-box">
                    {/* <img src={StellasIcon} alt={"Stellas-bank"} /> */}
                </div>

            </div>
            <div className="main-layout-sideNav-content">
                {SIDENAVLINKS.map((item, index) => {
                    // const Icon = item.icon;
                    const activeItem = active?.toLocaleLowerCase() || "";
                    const isActive = `/${activeItem}` === String(item.link).toLowerCase();

                    return (
                        <div
                            className={classnames("main-layout-sideNav-item", isActive && "active")}
                            key={`side-nav-item-${index}`}>
                            <Link
                                href={item.link === "/logout" ? '' : item.link}>
                                <a
                                    className={isActive ? 'active' : ''}
                                    role="button">
                                    <div className="bulb" />
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

import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { MobileHeaderToggler } from 'components';
import UserAvatar from 'assets/svg/user-avatar.svg';
import { SIDENAVLINKS } from 'constants/index';
import { resetApp } from 'redux/actions';
import { useRouter } from 'next/router';
import { useOnClickOutside } from 'hooks';

export const MainLayoutMobileHeader: React.FC<Props> = ({ active, avatar }): JSX.Element => {
    const dispatch = useDispatch();
    const ref: React.MutableRefObject<any> = useRef();
    const [isExpanded, setIsExpanded] = useState(false);

    const router = useRouter();

    const reset = () => {
        dispatch(resetApp());
        router.push("/");
    };

    useOnClickOutside(ref, () => isExpanded ? setIsExpanded(false) : null);

    return (
        <div className="landingLayout-header-mobile main-layout-header-mobile" ref={ref} >

            <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} />

            <div className={`landingLayout-header-mobile-exp ${isExpanded ? "expanded" : ""}`}>

                <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} />

                <div
                    className="main-layout-header-mobile-userBox"
                    tabIndex={0}
                    role={"button"}
                    onKeyDown={(e) => e.key === "Enter" && router.push("/account")}>
                    <Link href={"/account"}>
                        <a>
                            <img src={avatar || UserAvatar} alt={'user--'} />
                        </a>
                    </Link>
                </div>

                <div className="main-layout-header-mobile-links">

                    <div className="main-layout-sideNav-content">

                        {SIDENAVLINKS.map((item, index) => {
                            const Icon = item.icon;
                            const activeItem = active?.toLocaleLowerCase() || "";
                            return (
                                <div
                                    onClick={() => item.link === "/logout" ? reset() : null}
                                    className="main-layout-sideNav-item"
                                    key={`side-nav-item-${index}`}>
                                    <Link href={item.link === "/logout" ? '' : item.link}>
                                        <a
                                            className={(activeItem === String(item.title).toLowerCase()) ? 'active' : ''}
                                            role="button">
                                            <div dangerouslySetInnerHTML={{ __html: Icon }} className="bulb" />
                                            <span> {item.title} </span>
                                        </a>
                                    </Link>
                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>

        </div>
    );
}

interface Props {
    active: string,
    avatar?: string
}

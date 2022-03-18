import React, { useState } from 'react';
import { MobileHeaderToggler } from 'components';
import { leftLinks, rightLinks } from 'constants/index';
import router from 'next/router';

export const MobileHeader = ({ }): JSX.Element => {

    const [isExpanded, setIsExpanded] = useState(false);

    const links = [...leftLinks, ...rightLinks];

    return (
        <div className="landingLayout-header-mobile">

            <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} />

            <div className={`landingLayout-header-mobile-exp ${isExpanded ? "expanded" : ""}`}>

                <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} />

                <div className="landingLayout-header-mobile-bottom">

                    <div className="landingLayout-header-mobile-links">

                        {links.map((item, index) =>

                            <a
                                href={item.link || ""}
                                key={`landingLayout-header-left-item-${index}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsExpanded(false);
                                    setTimeout(() => router.push(item.link || "/"), 300);
                                }}>
                                {item.title}
                            </a>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

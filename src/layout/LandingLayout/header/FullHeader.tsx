import React from 'react';
import Link from 'next/link';
import { leftLinks, rightLinks } from 'constants/index';
import Twitter from 'assets/svg/social/Twitter.svg';
import { classnames } from 'utils';


export const FullHeader: React.FC<Props> = ({showInvest }): JSX.Element => {

    return (
        <div
            className={classnames('landingLayout-header', 'with-shades')}>

            <div className="landingLayout-header-holder">

                <div className="landingLayout-header-left">

                    <Link href={"/"}>
                        <a>
                            <img src={Twitter} alt={"HalaDigital"} />
                        </a>
                    </Link>

                    {leftLinks.map((item, index) =>

                        <Link
                            key={`landingLayout-header-left-item-${index}`}
                            href={item.link || ""}>
                            <a>
                                {item.title}
                            </a>
                        </Link>
                    )}

                </div>



                <div className="landingLayout-header-right">

                    { showInvest && rightLinks.map((item, index) =>
                        <Link
                            key={`landingLayout-header-right-item-${index}`}
                            href={item.link || ""}>
                            <a className={item.class}>
                                {item.title}
                            </a>
                        </Link>

                    )}

                </div>


            </div>

        </div>
    );
}

interface Props {
    showInvest?: boolean
}

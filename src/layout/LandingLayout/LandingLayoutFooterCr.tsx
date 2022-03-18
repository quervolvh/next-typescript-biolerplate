import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Twitter from 'assets/svg/social/Twitter.svg';

const LandingLayoutFooterCr: FunctionComponent = () => {

    return (
        <div className="landingLayout-footer-cr footer">

            <div className="landingLayout-footer-cr-holder">

                <Link href={"/"}>
                    <a>
                        <img src={Twitter} alt={"HalaDigital"} />
                    </a>
                </Link>

                <p> ©{new Date().getFullYear()} All rights reserved </p>

            </div>

        </div>
    );
}

export default LandingLayoutFooterCr;
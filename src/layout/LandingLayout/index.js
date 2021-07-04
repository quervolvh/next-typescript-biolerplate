import React from 'react';
import LandingLayoutHeader from './LandingLayoutHeader';
import { HtmlHead } from 'components';

export const LandingLayout = ({ title, headTitle, subtitle, ...props }) => {
    return (
        <>
            <HtmlHead
                title={headTitle}
            />
            <div className="landingLayout">

                <LandingLayoutHeader />

                <div className="landing-layout-body">
                    {props.children}
                </div>

            </div>
        </>
    );
}

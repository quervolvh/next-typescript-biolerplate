import React from 'react';
import { Header } from './header';
import { MetaHead } from 'components';
import { classnames } from 'utils';
import LandingLayoutFooterCr from './LandingLayoutFooterCr';
import LandingLayoutFooter from './Footer';

export const LandingLayout: React.FC<Props> = ({
    headTitle,
    isMobile,
    deviceWidth,
    showFooter = true,
    showHeader = false,
    className = "",
    bodyClass,
    bodyAlignment,
    showInvest,
    ...props
}) => {
    return (
        <>
            
            <MetaHead
                title={headTitle}
            />

            <div className={`landingLayout ${className}`}>

                {
                    showHeader &&
                    <Header
                        isMobile={isMobile}
                        showInvest={showInvest}
                        deviceWidth={deviceWidth}
                    />
                }

                <div
                    className={classnames("landing-layout-body", bodyAlignment === false && "default", bodyClass && bodyClass)}
                    id={"landing-layout-body"}
                >
                    {props.children}

                    {showFooter &&

                        <LandingLayoutFooter />

                    }

                </div>

                {showFooter &&

                    <>

                        <LandingLayoutFooterCr />

                    </>
                }

            </div>
        </>
    );
}

interface Props {
    headTitle: string,
    isMobile: boolean,
    deviceWidth: number,
    shadyHeader?: boolean,
    className?: string,
    showFooter?: boolean,
    showHeader?: boolean,
    bodyAlignment?: boolean,
    showInvest?: boolean,
    bodyClass?: string
}


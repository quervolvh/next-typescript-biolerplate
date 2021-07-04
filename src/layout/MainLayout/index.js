import React from 'react';
import MainLayoutSideNav from './MainLayoutSideNav';
import MainLayoutTopBar from './MainLayoutTopBar';
import MainLayoutHeaader from './MainLayoutHeader';
import { HtmlHead } from 'components';

export const MainLayout = ({ title, active , ...props }) => {

    return (
        <>
            <HtmlHead
                title={title}
            />
            <div className="mainLayout">
                <div className="mainLayout-left">
                    <MainLayoutSideNav active={active}  />
                </div>
                <div className="mainLayout-right">
                    <MainLayoutTopBar />
                    <div className="mainLayout-page-content">

                        {(props.displayTitle || props.displaySubtitle) &&

                            <MainLayoutHeaader
                                title={props.displayTitle}
                                subtitle={props.displaySubtitle}
                                />

                        }

                        <div className="mainlayout-page-content-space">
                            {props.children}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

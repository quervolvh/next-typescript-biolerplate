import React from 'react';
import { MainLayoutFullHeader } from './MainLayoutFullHeader';
import { MainLayoutMobileHeader } from './MainLayoutMobileHeader';

const MainLayoutHeader: React.FC<Props> = ({ isMobile, deviceWidth, active, title }): JSX.Element => {

    return (
        <>
            {(isMobile || deviceWidth < 1101)
                ?
                <MainLayoutMobileHeader
                    active={active}
                />

                :

                <MainLayoutFullHeader
                    title={title}
                />
                
            }
        </>
    )
}

export default MainLayoutHeader;

interface Props {
    isMobile: boolean,
    deviceWidth: number,
    active: string,
    title?: string
}

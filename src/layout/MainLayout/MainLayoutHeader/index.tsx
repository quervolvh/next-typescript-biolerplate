import React from 'react';
import { useSelector } from 'react-redux';
import { storeInterface, userType } from 'types';
import { MainLayoutFullHeader } from './MainLayoutFullHeader';
import { MainLayoutMobileHeader } from './MainLayoutMobileHeader';

const MainLayoutHeader: React.FC<Props> = ({ isMobile, deviceWidth, active, title }): JSX.Element => {

    const { user }: { user: userType } = useSelector((store: storeInterface) => store);

    return (
        <>
            {(isMobile || deviceWidth < 1101)
                ?
                <MainLayoutMobileHeader
                    active={active}
                    avatar={user.image}
                />

                :

                <MainLayoutFullHeader
                    avatar={user.image}
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

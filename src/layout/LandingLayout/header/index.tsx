import React from 'react';
import { FullHeader } from './FullHeader';
import { MobileHeader } from './MobileHeader';

export const Header: React.FC<Props> = ({ isMobile , showInvest }): JSX.Element => {

    return (
        <>

            {(isMobile) ?
                <MobileHeader /> :
                <FullHeader showInvest={showInvest} />
            }

        </>
    )
}
interface Props {
    isMobile: boolean,
    deviceWidth: number,
    showInvest?: boolean
}

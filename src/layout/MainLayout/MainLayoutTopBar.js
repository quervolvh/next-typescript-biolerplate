import React, { useState } from 'react';
import UserAvatar from 'assets/svg/user-avatar.svg';

const MainLayoutTopBar = () => {

    return (
        <div className="mainLayout-topBar">
           
            <div className="mainLayout-topBar-userBox">
                <UserAvatar />
            </div>
        </div>
    );
}

export default MainLayoutTopBar;

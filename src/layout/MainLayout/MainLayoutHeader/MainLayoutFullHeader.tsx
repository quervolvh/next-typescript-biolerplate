import React from 'react';
import UserAvatar from 'assets/svg/user-avatar.svg';
import Link from 'next/link';
import router from 'next/router';
import MainLayoutLegend from '../MainLayoutLegend';

export const MainLayoutFullHeader: React.FC<Props> = ({ avatar, title }) => {
  return (
    <div className="main-layout-topBar">
      <div className="main-layout-topBar-userBox">

        {title && <MainLayoutLegend title={title} />}


        <Link href={"/account"}>

          <a
            tabIndex={0}
            role={"button"}
            onKeyDown={(e) => e.key === "Enter" && router.push("/account")}
          >
            <img src={avatar || UserAvatar} alt={'user--'} />
          </a>

        </Link>
      </div>
    </div>
  );
};


interface Props {
  avatar?: string,
  title?: string
}

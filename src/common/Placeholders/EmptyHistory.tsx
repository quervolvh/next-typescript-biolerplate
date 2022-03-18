import React from 'react';
import { ComponentHeader } from 'components';
import EmptyIcon from 'assets/svg/empty-transaction.svg';

export const EmptyHistory: React.FC<{ title?: string , subtitle?: string, icon?: boolean }> = ({ title , subtitle, icon }) => {

    return (
        <div className="dashboard-page-history dashboard-page-history-empty">

            <ComponentHeader
                title={title || "Recent Transactions"}
                className={title ? "component-header-center" : ""}
            />

            <p> { subtitle || "You currently have no transaction history"} </p>

            {icon !== false && <img src={EmptyIcon} alt={"Empty transaction"} /> }

        </div>
    )
}

export default EmptyHistory;

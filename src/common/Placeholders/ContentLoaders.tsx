import React from 'react';

export const BillPlaceHolder: React.FC<{ length?: number }> = ({ length }) => {
    return (
        <div className="strickFadeIn">

            {[...Array(length || 3)].map((...args) =>
                <React.Fragment key={`placeholder-item-${args[1]}`}>
                    <div className="content-loader title" />
                    <div className="content-loader mt-0 mb-0" />
                </React.Fragment>
            )}

        </div>
    )
}

export const SettingsItemPlaceHolder: React.FC<{ length?: number }> = ({ length }) => {
    return (
        <div className="strickFadeIn">

            {[...Array(length || 3)].map((...args) =>
                <React.Fragment key={`placeholder-item-${args[1]}`}>

                    <div className="content-loader-v" >

                        <div className="content-loader-v-item" />

                        <div className="content-loader-v-item" />

                    </div>
                </React.Fragment>
            )}

        </div>
    )
}
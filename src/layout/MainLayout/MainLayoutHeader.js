import React from 'react';

const MainLayoutHeaader = ( { title , subtitle } ) => {

    return (
        <>
            {(title || subtitle) &&
                <div className="mainLayout-legend">
                    {
                        title &&
                        <div className="mainLayout-legend-title ideal-text">
                            <p> {title} </p>
                        </div>
                    }
                    {
                        subtitle &&
                        <div className="mainLayout-legend-subtitle">
                            <p className="ideal-text"> {subtitle} </p>
                        </div>
                    }
                </div>
            }
        </>
    )

}
export default MainLayoutHeaader;

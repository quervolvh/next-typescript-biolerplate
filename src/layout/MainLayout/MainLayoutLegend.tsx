import React from 'react';

const MainLayoutLegend: React.FC<props> = ({ title, subtitle, subtitleComponent }) => {

    return (
        <>
            {(title || subtitle || subtitleComponent) &&
                <div className="main-layout-legend">
                    {
                        title &&
                        <div className="main-layout-legend-title">
                            <h2> {title} </h2>
                        </div>
                    }
                    {
                        subtitle &&
                        <div className="main-layout-legend-subtitle">
                            <p> {subtitle} </p>
                        </div>
                    }
                    {subtitleComponent && subtitleComponent}
                </div>
            }
        </>
    )

}
export default MainLayoutLegend;

interface props {
    title?: string,
    subtitle?: string,
    subtitleComponent?: React.ReactElement<any, any>
}

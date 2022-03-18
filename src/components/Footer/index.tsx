import React, { FC } from 'react';
import Link from 'next/link';

export const FooterLinks: FC<Props> = ({ title, link }) => {
    return (
        <Link
            href={link}>
            <a className="footer-link"> {title} </a>
        </Link>
    );
}

export const FooterLogoField: FC<FooterLogoProps> = ({ logo, text, alt }) => {
    return (
        <div className="footer-logo">
            <img src={logo} alt={alt} />
            <p> {text} </p>
        </div>
    );
}

export const FooterIconSet: FC<{ icons: string[] , links?: string[] }> = ({ icons , links }) => {
    return (
        <div className="footer-icon-set">
            {icons.map((icon, index) =>
                <a 
                    key={`social-image-${index}`}
                    href={links?.[index] || ""}>
                    {icon.includes("<svg") ?
                        <div dangerouslySetInnerHTML={{ __html: icon }} role={"button"} /> :
                        <img src={icon} alt={`social-image-${index}`} role={"button"} />
                    }
                </a>)
            }
        </div>
    );
}

export const FooterLocation: FC<{ title: string, icon: string }> = ({ icon, title }) => {
    return (
        <div className="footer-location-set">
            <img src={icon} alt={title} />
            <p> {title} </p>
        </div>
    );
}


interface Props {
    link: string | '',
    title: string
}

interface FooterLogoProps {
    logo: string,
    text: string,
    alt: string
}

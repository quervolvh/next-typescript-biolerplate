import React from 'react';
import { classnames } from 'utils';
import { LinkWrapper } from './LinkWrapper';
import { ClassicViewFormatter } from './ViewFormatter/ClassicViewFormatter';
import { ViewFormatterIconBox } from './ViewFormatter/ViewFormatterIconBox';
import { RegularViewFormatter } from './ViewFormatter/RegularViewFormatter';
import { RightIcon } from './Assets';

export const ViewFormatter: React.FC<Props> = ({ wrapperClass, ...props }) => {

    const { type = "", visible, link, externalLink, alignIcon } = props;

    if (visible === false) {

        return null

    }

    return (
        <LinkWrapper
            link={link}
            externalLink={externalLink}
        >
            <div className={classnames(
                'view-formatter-wrapper-box',
                wrapperClass, alignIcon && "icon-align",
                type)} >

                <ViewFormatterIconBox
                    svgIcon={props.svgLeftIcon}
                    textIcon={props.leftTextIcon}
                    iconClass='view-formatter-left-icon'
                    linkIcon={props.linkIcon}
                />


                {
                    ["settings-item", "settings-item-flex", "classic"].includes(String(type))

                        ?

                        <ClassicViewFormatter
                            {...props}
                            type={type as "classic" | "settings-item" | "settings-item-flex"}
                        />

                        :

                        <RegularViewFormatter {...props} />
                }

                <ViewFormatterIconBox
                    svgIcon={ type === "settings-item" ? RightIcon() : props.svgRightIcon}
                    textIcon={props.rightTextIcon}
                    iconClass={classnames('view-formatter-left-icon', props.rightIconClass)}
                    linkIcon={props.rightLinkIcon}
                />

            </div>

        </LinkWrapper>
    )
}

interface Props {
    title?: string,
    value?: string | number | string[],
    valueClass?: string,
    type?: "settings-item" | "settings-item-flex" | "classic" | string,
    onClick?(): void,
    titleClass?: string,
    className?: string,
    visible?: boolean,
    rightLinkIcon?: string,
    svgLeftIcon?: string,
    alignIcon?: boolean,
    wrapperClass?: string,
    svgRightIcon?: string,
    rightTextIcon?: string,
    leftTextIcon?: string,
    extraValue?: string,
    rightIcon?: null | undefined | string,
    linkIcon?: string,
    link?: string,
    externalLink?: string,
    textBoxClass?: "view-formatter-text-box-flex",
    rightIconClass?: string
}

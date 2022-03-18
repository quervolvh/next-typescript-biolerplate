import React, { ReactElement, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { createPortal } from "react-dom";
import { useEffect } from 'react';
import { classnames, getModalHierarchy } from 'utils';
import { queries } from 'utils/router';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { routeType, storeInterface } from 'types';

const ModalDom: React.FC<Props> = ({ title, children, subtitle, noObviousExit, ...props }) => {

    const [animClass, setAnimClass] = useState({ modal: "", overlay: "fadeInside", holder: "slideUpInside" });

    const [modalHierarchy, setModalHierarchy] = useState(1);
    const [uniqueId] = useState("modal-" + Math.random().toString(36).substring(2, 5));

    const ref: any = useRef();

    const [urlDismissibleStatus, setUrlDismissibleStatus] = useState(false);

    const { route }: { route: routeType } = useSelector((store: storeInterface) => store);

    const urlPointers = route?.currentPath?.queries?.pointers;

    const showReboundEffect = () => {
        setAnimClass({ modal: "", overlay: "", holder: "" });
        setTimeout(() => setAnimClass({ modal: "rebound", overlay: "", holder: "" }), 100);
    }

    const urlOperation = (actionMode?: boolean, popMode?: boolean) => {

        if (actionMode) {

            router.replace(router.pathname);

        }

        if ((popMode && window) && !actionMode) {

            window.history.go(-1);

        }

    }

    const toggle = (force = false) => {

        if (props.toggleOut) {

            if (props.outsideEscape === false && props.normalEscape !== true) {
                showReboundEffect();
                return;
            }

            if (props.toggleOut !== undefined) {

                setTimeout(() => {

                    if (!force) {

                        urlOperation(["login", "expiredToken"].includes(String(router.query?.action)), true);

                    }

                    // @ts-expect-error
                    props.toggleOut();

                }, 500);

            }

        }
    }

    const toggleModal = (force: boolean) => {
        if (props.visibility && toggle) {
            toggle(force);
        }
    }

    const applyToggle = (force?: boolean | 'exitClick') => {

        const noRipple = force === "exitClick" && props.normalEscape;

        if (noRipple && (props.outsideEscape === false || urlDismissibleStatus === false)) {
            showReboundEffect();
            return;
        }

        if (modalHierarchy === 0 || getModalHierarchy(uniqueId).hierarchy === 0) {

            const urlActionMode = ["login", "expiredToken"].includes(String(router.query?.action));

            if ( force === "exitClick" ) {

                setUrlDismissibleStatus(false);

                props?.toggleOut && props.toggleOut();

                window.history.go(-1);

                return;

            }

           if ( !force ) {

                urlOperation(urlActionMode, true);

            }

            toggleModal(true);

        }

    }

    useEffect(() => {

        const config = { childList: true };

        const callback = function () {
            setModalHierarchy(getModalHierarchy(uniqueId).hierarchy);
        };

        const observer = new MutationObserver(callback);

        if (process.browser) {
            observer.observe(document.body, config);
        }

        return (() => {
            observer.disconnect();
        })

        // eslint-disable-next-line
    }, [process.browser]);

    useEffect(() => {

        queries(router, uniqueId);

        setTimeout(() => setUrlDismissibleStatus(true), 1000);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        const currentPointers = (route.currentPath.queries?.pointers || "").split("-");

        const previousPointers = (route.previousPath.queries?.pointers || "").split("-");

        const exclusionList = currentPointers.filter((item: string) => previousPointers.includes(item));

        if (!exclusionList.includes(uniqueId) && urlDismissibleStatus) {

            applyToggle(true);

        }

        //eslint-disable-next-line 
    }, [urlPointers]);

    useEffect(() => {

        if (props.customVisibility === "exiting") {

            setAnimClass({ modal: "slideDown", overlay: "fadeOutside", holder: "" });

        }

        // eslint-disable-next-line
    }, [props.customVisibility]);

    useOnClickOutside(ref, () => applyToggle(), uniqueId);

    if (props.customVisibility) {

        return (
            <div
                className={classnames('modal-overlay', props.overlayClass, animClass.overlay)} id={uniqueId}
                onTouchStart={e => e.stopPropagation()}
                tabIndex={0}>

                <div
                    className={classnames('modal-holder', props.holderClass, animClass.holder)}
                    onTouchStart={e => e.stopPropagation()}
                >

                    <div
                        className="modal-container"
                        onTouchStart={e => e.stopPropagation()}
                    >

                        {props.topIcon &&
                            <div className={`modal-top-icon`} >
                                <img
                                    src={props.topIcon}
                                    alt={title || ""} />
                            </div>
                        }

                        <div
                            className={`modal ${animClass.modal} ${props.class || ''}`} ref={ref}>

                            {
                                !noObviousExit &&

                                <div className="modal-exit">
                                    <i
                                        className="fas fa-times"
                                        onClick={() => applyToggle("exitClick")}
                                        role={"button"}
                                        onKeyDown={(e) => e.key === "Enter" && applyToggle("exitClick")}
                                        tabIndex={0} >
                                    </i>
                                </div>

                            }

                            {
                                props.navigatorExit &&

                                <div
                                    className="modal-navigator-exit"
                                    onClick={() => applyToggle("exitClick")}
                                    role={"button"}
                                    onKeyDown={(e) => e.key === "Enter" && applyToggle("exitClick")}
                                    tabIndex={0}
                                >

                                    <i className="fas fa-chevron-left" />

                                </div>

                            }

                            {props.icon &&
                                <div className="modal-icon">
                                    <img
                                        src={props.icon}
                                        alt={title || ""} />
                                </div>
                            }

                            {(title || subtitle) && !props.legendComponent &&
                                <div
                                    className={`modal-legend ${props.legendClass || ""}`}>
                                    {
                                        title &&

                                        <div className={
                                            classnames(
                                                "modal-legend-title",
                                                (props.titleSvgIcon || props.titleFlexComponent) && "modal-legend-title-flex"
                                            )
                                        }>

                                            <p> {title} </p>

                                            {props.titleSvgIcon &&
                                                <div
                                                    className="modal-legend-title-icon"
                                                    dangerouslySetInnerHTML={{ __html: props.titleSvgIcon }}
                                                />
                                            }

                                            {props.titleFlexComponent && props.titleFlexComponent}

                                        </div>
                                    }

                                    {
                                        (subtitle || props.subtitleLoader) &&
                                        <>
                                            {
                                                props.subtitleLoader ?
                                                    <div className="content-loader modal-subtitle">

                                                    </div>
                                                    :
                                                    <div className="modal-legend-subtitle">
                                                        <p> {subtitle} </p>
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>
                            }

                            {props.legendComponent && <div className={props.legendClass || ""}> {props.legendComponent} </div>}

                            {
                                children &&

                                <div className="modal_body">
                                    {children}
                                </div>
                            }

                        </div>

                    </div>

                </div>

            </div>
        )
    }

    return (<React.Fragment />)

}

export const Modal: React.FC<Props> = (props) => {

    const [customVisibility, setCustomVisibility] = useState<[boolean, boolean | string]>([false, false]);

    useEffect(() => {

        if (props.visibility && customVisibility?.[0] === true) {

            setCustomVisibility([true, props.visibility]);

        } else {

            setCustomVisibility([true, "exiting"]);

            setTimeout(() => {

                setCustomVisibility([true, false]);

            }, 500);

        }

        // eslint-disable-next-line
    }, [props.visibility]);

    useEffect(() => {

        setCustomVisibility([true, false]);

    }, []);

    if (process.browser && customVisibility?.[1]) {

        return createPortal(<ModalDom {...{ ...props, customVisibility: customVisibility?.[1] }} />, document.body);

    }

    return <></>
}

interface Props {
    title?: string,
    toggleVisibility?: () => void,
    toggleOut?: () => void,
    visibility?: boolean,
    class?: string,
    customVisibility?: string | boolean,
    overlayClass?: string,
    holderClass?: string,
    subtitle?: string,
    icon?: string,
    extendableRef?: any,
    legendClass?: string,
    legendComponent?: React.ReactElement,
    noObviousExit?: boolean,
    outsideEscape?: boolean,
    normalEscape?: boolean,
    topIcon?: string,
    subtitleLoader?: boolean,
    titleLoader?: boolean,
    titleSvgIcon?: string,
    titleFlexComponent?: ReactElement,
    navigatorExit?: boolean
}

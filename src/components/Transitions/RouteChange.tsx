import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { classnames } from 'utils';
import { useDispatch } from 'react-redux';
import * as RouteTypes from 'redux/types/routeTypes';
import * as WorkerTypes from 'redux/types/workerTypes';

export const RouteChange = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const [routeChange, setRouteChange] = useState({
        current: "",
        state: "idle"
    });

    const updateState = (state: string) => setRouteChange((prevState) => ({ ...prevState, state }));

    const path = router?.asPath;

    useEffect(() => {

        router.events.on("routeChangeStart", () => {

            dispatch({
                type: RouteTypes.ROUTE_TRANSITION_START,
                payload: {
                    fullPath: router.asPath,
                    queries: router.query,
                    specificPath: router.pathname
                }
            });

            updateState("start")

        });

        router.events.on(

            "routeChangeComplete",

            () => {

                updateState("complete");

                setTimeout(() => updateState("idle"), 2000);

                dispatch({
                    type: WorkerTypes.ADD_ACTIVITY,
                    payload: new Date().toISOString()

                });

            }

        );

        return (() => {
            router.events.off("routeChangeComplete", () => updateState("idle"));
        });
        // eslint-disable-next-line
    }, [typeof router === "object"]);

    useEffect(() => {

        if (path !== routeChange.current) {

            setRouteChange((prevState) => ({ ...prevState, current: path }));

            dispatch({
                type: RouteTypes.ROUTE_TRANSITION_COMPLETE,
                payload: {
                    fullPath: router.asPath,
                    queries: router.query,
                    specificPath: router.pathname
                }
            });

        }


        // eslint-disable-next-line
    }, [path]);

    return (

        <div className="router-scope">

            <div className={classnames(`router-scope-line router-scope-${routeChange.state}`)} />

        </div>

    )

}

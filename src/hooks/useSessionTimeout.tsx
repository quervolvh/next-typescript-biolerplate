import { useEffect } from 'react';
import { dateDifference } from 'utils/date';
import { store } from 'redux/store';
import * as WorkerTypes from 'redux/types/workerTypes';
import * as AuthTypes from 'redux/types/authTypes';
import { renewAuthToken } from 'redux/actions';
import { workerType } from 'types';

export const useSessionTimeout = (
    isInSession: boolean,
    triggerSessionBox: () => void
) => {

    const refreshToken = async () => {

        const workerState: workerType = store?.getState()?.worker;

        const refreshStatus = workerState.refreshing;

        if (!refreshStatus) {

            const val = await renewAuthToken();

            if ( typeof val === "string" && val.toLowerCase().includes("expired") ) {

                store.dispatch({ type: WorkerTypes.CLEAR_ACTIVITY });

            }

        }

    }

    const comparison = () => {

        const expiresAt = store?.getState()?.auth?.expiresAt;

        if (expiresAt) {

            const workerState: workerType = store?.getState()?.worker;

            const difference = dateDifference(new Date(expiresAt), new Date());

            if (difference.day > -1 && difference.minutes < 10) {

                const lastIndex = (workerState?.activity?.length || 1) - 1;

                if (!workerState?.activity?.[lastIndex]) {

                    return;

                }

                const lastActivityTime = new Date(String(workerState.activity[lastIndex]));

                const lastActivityDifference = dateDifference(new Date(), lastActivityTime);

                if (lastActivityDifference.minutes < 10) {

                    refreshToken();

                }

            }

            if (difference.day < 0) {

                triggerSessionBox();

            }

        }

    }

    useEffect(() => {

        const interval = setInterval(() => comparison(), 1000);

        return (() => {
            clearInterval(interval);
        });

        // eslint-disable-next-line
    }, [isInSession]);

    useEffect(() => {

        if (window) {

            window.addEventListener("click", () => {

                store.dispatch({
                    type: WorkerTypes.ADD_ACTIVITY,
                    payload: new Date().toISOString()

                });

            }, false);

        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        store.dispatch({ type: AuthTypes.REFRESH_TOKEN_FAILURE });

    }, []);

};

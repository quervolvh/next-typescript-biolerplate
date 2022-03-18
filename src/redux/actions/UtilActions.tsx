import axios from 'service/axios';
import * as utilTypes from '../types/utilTypes';
import { typeOfDispatch } from 'redux/store';

const details = (reqType: string): { start: string, success: string, failure: string } => {
    switch (reqType) {
        case "retrieve-cities":
            return {
                start: utilTypes.GET_CITIES_START,
                success: utilTypes.GET_CITIES_SUCCESS,
                failure: utilTypes.GET_CITIES_FAILURE,
            };
        default:
            return {
                start: utilTypes.GET_STATES_START,
                success: utilTypes.GET_STATES_SUCCESS,
                failure: utilTypes.GET_STATES_FAILURE,
            };
    }
}


export const getAddressInfo = (
    ref: 'retrieve-cities' | 'retrieve-states',
    stateId?: string,
) => async (dispatch: typeOfDispatch) => {

    const dispatchTypes = details(ref);

    try {

        dispatch({ type: dispatchTypes.start });

        const { data } = await axios.post('/api/util', { authType: ref, id: stateId });

        dispatch({
            type: dispatchTypes.success,
            payload: data?.data
        });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: dispatchTypes.failure, payload: data });

        return { message: data?.error?.message, status: false };
    }
};

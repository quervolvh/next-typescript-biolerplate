import axios from 'service/axios';
import * as AuthActions from '../types/authTypes';
import { typeOfDispatch } from 'redux/store';

export const workerActions = (userDetails: { [key: string]: any }) => async (dispatch: typeOfDispatch) => {
    try {
        dispatch({ type: AuthActions.REGISTER_START });

        await axios.post('/api/auth', { ...userDetails });

        dispatch({ type: AuthActions.REGISTER_SUCCESS });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AuthActions.REGISTER_FAILURE, payload: data });

        return data?.error?.message || false;
    }
};

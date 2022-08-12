import axios from 'service/axios';
import * as AuthActions from '../types/authTypes';
import { store, typeOfDispatch } from 'redux/store';

export const renewAuthToken = async () => {

    try {

        store.dispatch({ type: AuthActions.REFRESH_TOKEN_START });

        const { data } = await axios.post('/api/auth', { authType: "refresh-token", refreshtoken: store?.getState()?.auth?.refreshtoken });

        store.dispatch({ type: AuthActions.REFRESH_TOKEN_SUCCESS, payload: data });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        store.dispatch({ type: AuthActions.REFRESH_TOKEN_FAILURE, payload: data });

        return data?.error?.message || false;

    }
}

export const resetApp = () => async (dispatch: typeOfDispatch) => {
    try {
        dispatch({ type: AuthActions.RESET_APP_START });
        dispatch({ type: AuthActions.RESET_APP });
        dispatch({ type: AuthActions.RESET_APP_SUCCESS });
        return true;

    } catch (error: any) {
        dispatch({ type: AuthActions.RESET_APP_FAILURE });
    }
}

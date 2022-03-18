import axios from 'service/axios';
import * as AuthActions from '../types/authTypes';
import * as UserActions from '../types/userTypes';
import * as AccountActions from '../types/accountTypes';
import * as TransactionActions from '../types/TransactionTypes';
import { store, typeOfDispatch } from 'redux/store';

export const validateUser = async (userDetails: { email?: string, phone?: string }) => {

    // Checks if a user's email or phone exists in the database.

    try {

        if (userDetails?.email && userDetails?.phone) throw ({ error: { response: { data: "One at a time !" } } })

        await axios.post('/api/auth', { ...userDetails, authType: "validate-user" });

        // Here, the user does not exist and a registration attempt is valid.

        return false;

    } catch (error: any) {

        // Here, the user exists and a registration attempt is invalid. This also means the user has signed up already.

        const data = error?.response?.data

        return String(data?.error?.message || "").toLowerCase().includes("credential already exist") || "error";

    }
}

export const registerUser = (
    userDetails: {
        email?: string,
        phone?: string,
        firstname?: string,
        lastname?: string
    }) => async (dispatch: typeOfDispatch) => {

        try {

            dispatch({ type: AuthActions.REGISTER_START });

            await axios.post('/api/auth', { ...userDetails });

            dispatch({ type: AuthActions.REGISTER_SUCCESS });

            return true;

        } catch (error: any) {

            const data = error?.response?.data;

            dispatch({ type: AuthActions.REGISTER_FAILURE, payload: data });

            if (String(data?.error?.message || "").toLowerCase().includes("user is already signed up")) {

                const emailExistence = await validateUser({ email: userDetails.email });

                if (emailExistence === true) {

                    return "existing-email";

                }

            }

            return data?.error?.message || false;
        }
    };

export const processLoginResponse = (data: { [key: string]: any }, dispatch: typeOfDispatch) => {

    const { accesstoken, refreshtoken, transactionFee, stellas_code } = data;

    dispatch({
        type: AuthActions.LOGIN_SUCCESS,
        payload: { accesstoken, refreshtoken }
    });

    dispatch({
        type: TransactionActions.SAVE_TRANSACTION_CONSTANTS,
        payload: { fees: transactionFee, ownBankCode: stellas_code }
    });

    dispatch({
        type: UserActions.SAVE_USER_DETAILS,
        payload: { ...(data?.data || {}) }
    });

    dispatch({
        type: AccountActions.SET_ACTIVE_ACCOUNT,
        payload: data?.data?.accountNumber
    });

    return true;

}

export const loginUser = (userDetails: { [key: string]: any }) => async (dispatch: typeOfDispatch) => {

    try {

        dispatch({ type: AuthActions.LOGIN_START });

        let { data } = await axios.post('/api/auth', { ...userDetails, authType: "login" });

        if (data?.data?.onboarded === false && data?.data?.verified === false) {

            processLoginResponse(data, dispatch);

            return "not-onboarded";

        }

        if (data?.data?.migrated === true) {

            return { process: "migrated", body: data };

        }

        return { process: "2FA", body: { email: data?.data?.email } };

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AuthActions.LOGIN_FAILURE, payload: data });

        if (String(data?.error?.message || "").toLowerCase().includes("verify your email")) {

            return "verify-email";

        }

        return data?.error?.message || false;
    }

};

export const forgotPassword = (userDetails: { [key: string]: any }) => async (dispatch: typeOfDispatch) => {
    try {

        dispatch({ type: AuthActions.REQUEST_RESET_START });

        await axios.post('/api/auth', { ...userDetails, authType: "forgot-password" });

        dispatch({ type: AuthActions.REQUEST_RESET_SUCCESS });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AuthActions.REQUEST_RESET_FAILURE, payload: data });

        return data?.error?.message || false;

    }
}

export const authenticateLogin = (userDetails: { [key: string]: any }) => async (dispatch: typeOfDispatch) => {
    try {

        dispatch({ type: AuthActions.LOGIN_2FA_START });

        const { data } = await axios.post('/api/auth', { ...userDetails, authType: "authenticate" });

        dispatch({ type: AuthActions.LOGIN_2FA_SUCCESS });

        processLoginResponse(data, dispatch);

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AuthActions.LOGIN_2FA_FAILURE, payload: data });

        return data?.error?.message || false;

    }
}

export const resendVerificationOtp = (userDetails: { [key: string]: any }) => async (dispatch: typeOfDispatch) => {
    try {

        dispatch({ type: AuthActions.RESEND_VERIFICATION_START });

        await axios.post('/api/auth', { ...userDetails, authType: "resend-verification" });

        dispatch({ type: AuthActions.RESEND_VERIFICATION_SUCCESS });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AuthActions.RESEND_VERIFICATION_FAILURE, payload: data });

        return data?.error?.message || false;

    }
}

export const resetPassword = (userDetails: { [key: string]: any }) => async (dispatch: typeOfDispatch) => {
    try {

        dispatch({ type: AuthActions.RESET_PASSWORD_START });

        await axios.post('/api/auth', { ...userDetails, authType: "reset-password" });

        dispatch({ type: AuthActions.RESET_PASSWORD_SUCCESS });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AuthActions.RESET_PASSWORD_FAILURE, payload: data });

        return data?.error?.message || false;

    }
}

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

export const mobileOtpProcess = (
    authType: 'send-otp-mobile' | 'verify-otp-mobile' | 'resend-otp-mobile',
    phone: string,
    otp?: string
) => async (dispatch: typeOfDispatch) => {

    try {

        dispatch({ type: AuthActions.MOBILE_OTP_PROCESS_START, payload: { authType, phone } });

        const { data } = await axios.post('/api/auth', { authType, phone, otp });

        dispatch({ type: AuthActions.MOBILE_OTP_PROCESS_SUCCESS, payload: { authType, phone, data } });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AuthActions.MOBILE_OTP_PROCESS_FAILURE, payload: { authType, phone, error } });

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

import axios from 'service/axios';
import Axios from 'axios';
import * as AccountActions from '../types/accountTypes';
import { accessToken, quickToast, typeOfDispatch } from 'redux/store';
import { errorParser } from 'constants/index';
import * as UserActions from '../types/userTypes';

export const getAccountBalance = () => async (dispatch: typeOfDispatch) => {
    try {
        dispatch({ type: AccountActions.GET_BALANCE_START });

        const { data } = await axios.post('/api/account', { authType: "account-balance" });

        dispatch({ type: AccountActions.GET_BALANCE_SUCCESS, payload: data?.data || 0.0 });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AccountActions.GET_BALANCE_FAILURE, payload: data });

        return data?.error?.message || false;
    }
};

export const getBVN = (userDetails: { [key: string]: any }) => async (dispatch: typeOfDispatch) => {
    try {
        dispatch({ type: AccountActions.GET_BVN_START });

        const { data } = await axios.post('/api/account', { ...userDetails, authType: "bvn" });

        dispatch({ type: AccountActions.GET_BVN_SUCCESS });

        return { bvn: data?.data };

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AccountActions.GET_BVN_FAILURE, payload: data });

        return data?.error?.message || false;
    }
};

export const getAccountNumber = () => async (dispatch: typeOfDispatch) => {
    try {
        dispatch({ type: AccountActions.GET_ACCOUNT_NUMBER_START });

        const { data } = await axios.post('/api/account', { authType: "account-number" });

        if (!data.accounts) throw Error;

        dispatch({ type: AccountActions.GET_ACCOUNT_NUMBER_SUCCESS, payload: data?.accounts || "" });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AccountActions.GET_ACCOUNT_NUMBER_FAILURE, payload: data });

        return data?.error?.message || false;
    }
};

export const enquireAccount = (accountDetails: { bankCode: string, accountNumber: string }) => async (dispatch: typeOfDispatch) => {
    try {
        dispatch({ type: AccountActions.ENQUIRE_ACCOUNT_START });

        const { data } = await axios.post('/api/account', { ...accountDetails, authType: "account-enquiry" });

        dispatch({ type: AccountActions.ENQUIRE_ACCOUNT_SUCCESS });

        return { message: data?.data, status: true };

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: AccountActions.ENQUIRE_ACCOUNT_FAILURE, payload: data });

        return { message: errorParser(data?.error?.message || "", "account-enquiry"), status: false };
    }
};

export const updateUserAvatar = async (avatar: FormData) => {

    try {

        await Axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/update/avatar`, avatar,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': accessToken() || "",
                },
                withCredentials: false,
            }
        );

        return true;

    } catch (error: any) {

        return false;
    }

};

export const setActiveAccount = (accountNumber: string) => async (dispatch: typeOfDispatch) => {

    try {

        dispatch({
            type: AccountActions.SET_ACTIVE_ACCOUNT,
            payload: accountNumber
        });

        return true;

    } catch (error: any) {

        return false;
    }

};

export const updateUserDetails = (
    accountDetails: {
        image?: FormData,
        address?: string,
        old_password?: string,
        new_password?: string,
        base64?: string,
        accesstoken?: string,
        pin?: string,
        password?: string,
        city?: string,
        state?: string
    },
    ref: 'update-user-avatar' | 'update-user-profile' | 'update-user-password' | 'update-pin',
    withToast: boolean = true
) => async (dispatch: typeOfDispatch) => {

    try {
        dispatch({ type: UserActions.UPDATE_USER_DETAILS_START });

        if (accountDetails?.image) {

            const res = await updateUserAvatar(accountDetails?.image);

            if (res !== true) throw Error("Cannot process this request");


        } else {

            await axios.post(
                '/api/account',
                { ...accountDetails, authType: ref },
            );

        }

        delete accountDetails.old_password;
        delete accountDetails.new_password;
        delete accountDetails.pin;
        delete accountDetails.password;

        dispatch({
            type: UserActions.UPDATE_USER_DETAILS_SUCCESS,

            payload: accountDetails.base64 ?

                { image: accountDetails.base64 } :
                { ...accountDetails, ...(ref === "update-pin" ? { "pinCreated": true } : {}) }
        });

        withToast && quickToast({ text: accountDetails.new_password ? "Password updated" : "Profile updated" });

        return true;

    } catch (error: any) {

        const data = error?.response?.data;

        dispatch({ type: UserActions.UPDATE_USER_DETAILS_FAILURE, payload: ref === "update-user-password" ? {} : accountDetails });

        withToast && quickToast({ text: "Unable to update profile at the moment" });

        return { message: data?.error?.message, status: false };
    }
};

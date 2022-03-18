import { typeOfDispatch } from 'redux/store';
import * as toastTypes from '../types/toastTypes';

const addToast = (toast: { text: string, id: string, new: boolean }) => ({
    type: toastTypes.ADD_TOAST,
    toast
});

const manualDismiss = (id: string) => ({
    type: toastTypes.MANUALLY_DISMISS_TOAST,
    ...{ id }
});

const assignDismiss = (feed: { id: string }) => ({
    type: toastTypes.ASSIGN_TO_DISMISS,
    ...feed
});

export const manualDismissal = (id: string) : any => async (dispatch: typeOfDispatch) => {
    dispatch(assignDismiss({ id }));
    setTimeout(() => {
        dispatch(manualDismiss(id));
    }, 200);
};

export const toggleToast = (feed: { text: string }) : any => async (dispatch: typeOfDispatch) => {
    const toastId = (Math.random() + 1).toString(36).substring(7) + String(new Date().getTime());
    const toast = { ...feed, id: toastId, new: true };
    dispatch(addToast({ ...toast }));
    setTimeout(() => {
        dispatch(manualDismissal(toast.id));
    }, 2800);
};

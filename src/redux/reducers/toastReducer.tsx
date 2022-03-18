import * as toastTypes from '../types/toastTypes';
import { toastType } from 'types';

const initialState : toastType = {
    timer: 5000,
    nature: undefined,
    manualDismiss: false,
    toDismiss: undefined,
    toast: undefined,
    toasts: []
};


// const showFeedbackComplete = (state) => (state.manualDismiss ? updateObject(state, { }) : initialState);


const feedbackReducer = (state = initialState, action: { [key: string]: any }) => {
    switch (action.type) {

        case toastTypes.SHOW_TOAST_START:
            return ({
                ...state,
                toast: action.toast,
                nature: action.nature,
                manualDismiss: false
            });

        case toastTypes.MANUALLY_DISMISS_TOAST:
            return ({
                ...state,
                toasts: state.toasts.filter((toast) => toast.id !== action.id)
            });

        case toastTypes.ADD_TOAST:
            return ({
                ...state,
                toasts: [...state.toasts.map((toast) => ({ ...toast, new: false })), action.toast]
            });

        case toastTypes.ASSIGN_TO_DISMISS:
            return ({
                ...state,
                toDismiss: action.id,
                toasts: [...state.toasts.map((toast) => ({ ...toast, new: false }))]
            });

        default:
            return state;
    }
};

export default feedbackReducer;
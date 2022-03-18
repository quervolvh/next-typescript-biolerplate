import axios from 'service/axios';
import * as beneficiaryActions from '../types/beneficiaryTypes';
import { typeOfDispatch } from 'redux/store';
import { errorParser } from 'constants/index';

const details = (reqType: string): { start: string, success: string, failure: string } => {
    switch (reqType) {
        case "delete-beneficiaries":
            return {
                start: beneficiaryActions.DELETE_BENEFICIARIES_START,
                success: beneficiaryActions.DELETE_BENEFICIARIES_SUCCESS,
                failure: beneficiaryActions.DELETE_BENEFICIARIES_FAILURE,
            };
        case "add-beneficiaries":
            return {
                start: beneficiaryActions.ADD_BENEFICIARIES_START,
                success: beneficiaryActions.ADD_BENEFICIARIES_SUCCESS,
                failure: beneficiaryActions.ADD_BENEFICIARIES_FAILURE,
            };
        default:
            return {
                start: beneficiaryActions.RETRIEVE_BENEFICIARIES_START,
                success: beneficiaryActions.RETRIEVE_BENEFICIARIES_SUCCESS,
                failure: beneficiaryActions.RETRIEVE_BENEFICIARIES_FAILURE,
            };
    }
}

export const getBeneficiaries = (
    process: "retrieve-beneficiaries" | "add-beneficiaries" | "delete-beneficiaries",
    item?: { [key: string]: any }) =>
    async (dispatch: typeOfDispatch) => {

        const dispatchTypes = details(process);

        try {

            dispatch({ type: dispatchTypes.start });

            const { data } = await axios.post('/api/beneficiaries', { reqType: process, ...item });

            dispatch({ type: dispatchTypes.success, payload: data?.data || [] });

            return true;

        } catch (error : any ) {

            const data = error?.response?.data;

            dispatch({ type: dispatchTypes.failure, payload: data });

            return errorParser(data?.error?.message || "", "retrieve-beneficiaries");
        }
    };

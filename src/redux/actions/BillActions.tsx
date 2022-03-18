import axios from 'service/axios';
import * as BillTypes from '../types/billTypes';
import * as TransactionTypes from '../types/TransactionTypes';
import * as AccountTypes from '../types/accountTypes';
import { typeOfDispatch } from 'redux/store';

const details = (reqType: string): { start: string, success: string, failure: string, authType: string } => {
    switch (reqType) {
        case "category":
            return {
                start: BillTypes.RETRIEVE_CATEGORY_BILLS_START,
                success: BillTypes.RETRIEVE_CATEGORY_BILLS_SUCCESS,
                failure: BillTypes.RETRIEVE_CATEGORY_BILLS_FAILURE,
                authType: "with-category"
            };
        case "product":
            return {
                start: BillTypes.RETRIEVE_BILLERS_PRODUCT_START,
                success: BillTypes.RETRIEVE_BILLERS_PRODUCT_SUCCESS,
                failure: BillTypes.RETRIEVE_BILLERS_PRODUCT_FAILURE,
                authType: "with-product"
            };
        case "payment":
            return {
                start: BillTypes.PAY_BILL_START,
                success: BillTypes.PAY_BILL_SUCCESS,
                failure: BillTypes.PAY_BILL_FAILURE,
                authType: "pay"
            };
        case "get-recurring":
            return {
                start: BillTypes.RETRIEVE_RECURRING_BILLS_START,
                success: BillTypes.RETRIEVE_RECURRING_BILLS_SUCCESS,
                failure: BillTypes.RETRIEVE_RECURRING_BILLS_FAILURE,
                authType: "get-recurring"
            }
        case "get-scheduled":
            return {
                start: BillTypes.RETRIEVE_SCHEDULED_BILLS_START,
                success: BillTypes.RETRIEVE_SCHEDULED_BILLS_SUCCESS,
                failure: BillTypes.RETRIEVE_SCHEDULED_BILLS_FAILURE,
                authType: "get-scheduled"
            }

        case "cancel-recurring":
            return {
                start: BillTypes.CANCEL_RECURRING_BILLS_START,
                success: BillTypes.CANCEL_RECURRING_BILLS_SUCCESS,
                failure: BillTypes.CANCEL_RECURRING_BILLS_FAILURE,
                authType: "cancel-recurring"
            }

        case "cancel-scheduled":
            return {
                start: BillTypes.CANCEL_SCHEDULED_BILLS_START,
                success: BillTypes.CANCEL_SCHEDULED_BILLS_SUCCESS,
                failure: BillTypes.CANCEL_SCHEDULED_BILLS_FAILURE,
                authType: "cancel-scheduled"
            }

        case "create-schedule":
            return {
                start: BillTypes.CREATE_SCHEDULED_BILL_START,
                success: BillTypes.CREATE_SCHEDULED_BILL_SUCCESS,
                failure: BillTypes.CREATE_SCHEDULED_BILL_FAILURE,
                authType: "create-schedule"
            }

        default:
            return {
                start: BillTypes.RETRIEVE_BILLS_START,
                success: BillTypes.RETRIEVE_BILLS_SUCCESS,
                failure: BillTypes.RETRIEVE_BILLS_FAILURE,
                authType: ""
            };
    }
}

type extraType = { billerID?: string, categoryID?: string, debitAccount?: string, amount?: number, [key: string]: any };

type refType = "category" | "product" | "payment" | "get-recurring" | "get-scheduled" | "cancel-recurring" | "cancel-scheduled" | "create-schedule";

export const getAllBills = (
    ref?: refType,
    id?: string,
    extra?: extraType,
    toReturn?: boolean
) => async (dispatch: typeOfDispatch) => {

    const { authType, start, success, failure } = details(ref || "");

    try {

        dispatch({ type: start, payload: id });

        const { data } = await axios.post("/api/bills",
            { ref: id, authType, extra });

        if (data.data && toReturn) return data.data;

        dispatch({
            type: success,
            payload: ["", "get-recurring", "get-scheduled"].includes(authType) ? data.data :
                { ref: id, data: data?.data, ...(ref === "product" ? { ...extra } : {}) }
        });

        if (data.data && ref === "payment" && !extra?.recurring) {

            dispatch({
                type: AccountTypes.UPDATE_BALANCE,
                payload: {
                    difference: (data.data?.totalAmount || extra?.amount || 0.0),
                    associatedAccount: extra?.debitAccount
                }
            });

            dispatch({ type: TransactionTypes.ADD_BASE_TRANSACTION, payload: { data: data.data } })

        }

        return true;

    } catch (error: any) {

        if (toReturn) return false;

        const data = error?.response?.data;

        dispatch({ type: failure, payload: !authType.length ? data : { ref: id, data: data?.data } });

        return data?.error?.message || false;
    }
};

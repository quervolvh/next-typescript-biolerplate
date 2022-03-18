import axios from 'service/axios';
import * as TransactionActions from '../types/TransactionTypes';
import * as AccountTypes from '../types/accountTypes';
import { typeOfDispatch } from 'redux/store';
import { errorParser } from 'constants/index';

export const processTransaction = (transactionDetails: { [key: string]: string | boolean }) =>
    async (dispatch: typeOfDispatch) => {
        try {
            dispatch({ type: TransactionActions.TRANSACTION_START, payload: transactionDetails });

            const { data } = await axios.post(
                '/api/transaction',
                {
                    ...transactionDetails,
                    authType: !transactionDetails?.bankCode ? "intra-transfer" : "interbank-transfer"
                }
            );

            dispatch({ type: TransactionActions.TRANSACTION_SUCCESS, payload: data?.data || 0.0 });

            if (data.data) {

                dispatch({
                    type: AccountTypes.UPDATE_BALANCE,
                    payload: {
                        difference: (data.data?.totalAmount || transactionDetails.amount),
                        associatedAccount: transactionDetails?.debitAccount
                    }
                });

                dispatch({ type: TransactionActions.ADD_BASE_TRANSACTION, payload: data.data });

            }

            return true;

        } catch (error: any) {

            const data = error?.response?.data;

            dispatch({ type: TransactionActions.TRANSACTION_FAILURE, payload: data });

            return errorParser(data?.error?.message || "", "transaction");
        }
    };

export const getBankCodes = () =>
    async (dispatch: typeOfDispatch) => {
        try {
            dispatch({ type: TransactionActions.RETRIEVE_BANK_CODES_START });

            const { data } = await axios.post('/api/transaction', { authType: "bank-codes" });

            dispatch({ type: TransactionActions.RETRIEVE_BANK_CODES_SUCCESS, payload: data?.data });

            return true;

        } catch (error: any) {

            const data = error?.response?.data;

            dispatch({ type: TransactionActions.RETRIEVE_BANK_CODES_FAILURE, payload: data });

            return errorParser(data?.error?.message || "", "bank-codes");
        }
    };

export const getTransactions = (
    base?: boolean | "no-dispatch",
    queryParam: {
        perPage?: number,
        page?: number,
        type?: 'debit' | 'credit',
        start?: string,
        end?: string,
        plain?: boolean,
        accountNumber?: string
    } = {}
) =>
    async (dispatch: typeOfDispatch) => {
        try {

            const param = queryParam ? new URLSearchParams(Object(queryParam)).toString() : "";

            if (base !== "no-dispatch") {

                dispatch({
                    type: TransactionActions.RETRIEVE_TRANSACTIONS_START,
                    payload: { type: base ? "base" : "data" }
                });

            }

            const { data } = await axios.post('/api/transaction', { authType: "retrieve-transactions", param });

            if (queryParam.plain && base === "no-dispatch") {

                return data.data;
            }

            const {
                datacount: { dataCount },
                page, pageCount, perPage
            } = data;


            if (base !== "no-dispatch") {

                const block = base && queryParam.accountNumber ? { [queryParam.accountNumber]: data?.data || [] } : data?.data || [];

                dispatch({
                    type: TransactionActions.RETRIEVE_TRANSACTIONS_SUCCESS,
                    payload: { [base ? "base" : "data"]: block, dataCount, page, pageCount, perPage }
                });

            }

            return true;

        } catch (error: any) {

            const data = error?.response?.data;

            if (base !== "no-dispatch") {

                dispatch({
                    type: TransactionActions.RETRIEVE_TRANSACTIONS_FAILURE,
                    payload: { type: base ? "base" : "data", data }
                });

            }

            return base !== "no-dispatch" ?
                errorParser(data?.error?.message || "", "retrieve-transaction") :
                false;
        }
    };

const analyticsTypes = (reqType: string): { start: string, success: string, failure: string } => {
    switch (reqType) {
        case "analytics":
            return {
                start: TransactionActions.RETRIEVE_TRANSACTION_ANALYTICS_START,
                success: TransactionActions.RETRIEVE_TRANSACTION_ANALYTICS_SUCCESS,
                failure: TransactionActions.RETRIEVE_TRANSACTION_ANALYTICS_FAILURE
            };
        case "bank-statement":
            return {
                start: TransactionActions.RETRIEVE_BANK_STATEMENT_FAILURE,
                success: TransactionActions.RETRIEVE_BANK_STATEMENT_SUCCESS,
                failure: TransactionActions.RETRIEVE_BANK_STATEMENT_FAILURE
            }
        default:
            return {
                start: TransactionActions.RETRIEVE_TRANSACTION_CHART_FAILURE,
                success: TransactionActions.RETRIEVE_TRANSACTION_CHART_SUCCESS,
                failure: TransactionActions.RETRIEVE_TRANSACTION_CHART_FAILURE
            };
    }
}

export const getTransactionAnalytics = (
    param?: { [key: string]: "day" | "week" | "month" | "year" | string },
    ref: "analytics" | "chart" | "bank-statement" = "analytics"
) =>
    async (dispatch: typeOfDispatch) => {
        try {

            const queryParam = param ? new URLSearchParams(param).toString() : "";

            dispatch({ type: analyticsTypes(ref).start });

            const { data } = await axios.post(
                '/api/transaction',
                {
                    authType: ref,
                    param: queryParam,
                    ...(ref === "bank-statement" ? param : {})
                }
            );

            dispatch({ type: analyticsTypes(ref).success, payload: data });

            return true;

        } catch (error: any) {

            const data = error?.response?.data;

            dispatch({ type: analyticsTypes(ref).failure, payload: data });

            return errorParser(data?.error?.message || "", ref);
        }
    };

export const addMoneyByCard = (
    amount?: number,
    accountNumber?: string
) =>
    async (dispatch: typeOfDispatch) => {
        try {

            dispatch({ type: TransactionActions.ADD_MONEY_BY_CARD_START });

            const { data } = await axios.post(
                '/api/transaction',
                {
                    authType: "add-money",
                    amount,
                    accountNumber
                }
            );

            dispatch({ type: TransactionActions.ADD_MONEY_BY_CARD_SUCCESS, payload: data });

            return data;

        } catch (error: any) {

            const data = error?.response?.data;

            dispatch({ type: TransactionActions.ADD_MONEY_BY_CARD_FAILURE, payload: data });

            return errorParser(data?.error?.message || "");
        }
    };
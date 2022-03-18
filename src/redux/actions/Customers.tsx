import { typeOfDispatch } from "redux/store";
import axios from 'service/axios';
import { errorParser } from "constants/index";
import * as CustomerTypes from "redux/types/customerTypes";

export const getCustomers = (
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
                    type: CustomerTypes.GET_CUSTOMERS_START,
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
                    type: CustomerTypes.GET_CUSTOMERS_SUCCESS,
                    payload: { [base ? "base" : "data"]: block, dataCount, page, pageCount, perPage }
                });

            }

            return true;

        } catch (error: any) {

            const data = error?.response?.data;

            if (base !== "no-dispatch") {

                dispatch({
                    type: CustomerTypes.GET_CUSTOMERS_FAILURE,
                    payload: { type: base ? "base" : "data", data }
                });

            }

            return base !== "no-dispatch" ?
                errorParser(data?.error?.message || "", "retrieve-transaction") :
                false;
        }
    };

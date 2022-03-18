import * as transactionTypes from 'redux/types/TransactionTypes';
import { baseTransactionType } from 'types';

const initialState: {
  analytics?: { [key: string]: any, loader?: boolean },
  chart?: { [key: string]: any, loader?: boolean },
  transactions:
  {
    data: baseTransactionType[],
    base: { [key: string]: baseTransactionType[] },
    baseLoader: boolean,
    dataLoader: boolean
  },
  transactionFee: string,
  ownBankCode: string
} = {
  ownBankCode: "",
  transactionFee: "0.0",
  transactions: {
    data: [],
    base: {},
    baseLoader: false,
    dataLoader: false
  }
};

const transactionReducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {

    case transactionTypes.SAVE_TRANSACTION_CONSTANTS:
      return {
        ...state,
        transactionFee: action?.payload?.fees || "0.0",
        ownBankCode: action?.payload?.ownBankCode || ""
      }

    case transactionTypes.RETRIEVE_BANK_CODES_SUCCESS:
      return {
        ...state,
        bankCodes: action.payload
      };

    case transactionTypes.RETRIEVE_TRANSACTIONS_START:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.type === "base" ? "baseLoader" : "dataLoader"]: true,
        }
      };

    case transactionTypes.RETRIEVE_TRANSACTIONS_FAILURE:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.type === "base" ? "baseLoader" : "dataLoader"]: false,
          [action.payload.type === "base" ? "baseError" : "dataError"]: true
        }
      };

    case transactionTypes.RETRIEVE_TRANSACTIONS_SUCCESS:

      const isBase = action.payload.base;

      return {
        ...state,
        transactions: {
          ...state.transactions,
          ...action.payload,
          ...(

            (isBase) ?

              {
                base: {
                  ...state.transactions.base,
                  ...action.payload.base
                }
              } :

              {}

          ),

          [action.payload.base ? "baseLoader" : "dataLoader"]: false,
          [action.payload.base ? "baseError" : "dataError"]: false,
        }
      };

    case transactionTypes.RETRIEVE_TRANSACTION_ANALYTICS_START:
      return {
        ...state,
        analytics: {
          ...(state.analytics ? state.analytics : {}),
          loader: true,
        }
      }
    case transactionTypes.RETRIEVE_TRANSACTION_ANALYTICS_SUCCESS:
      return {
        ...state,
        analytics: {
          loader: false,
          error: false,
          ...action.payload
        }
      }
    case transactionTypes.RETRIEVE_TRANSACTION_ANALYTICS_FAILURE:
      return {
        ...state,
        analytics: {
          ...(state.analytics ? state.analytics : {}),
          loader: false,
          error: true
        }
      }
    case transactionTypes.RETRIEVE_TRANSACTION_ANALYTICS_START:
      return {
        ...state,
        analytics: {
          ...(state.analytics ? state.analytics : {}),
          loader: true,
        }
      }
    case transactionTypes.RETRIEVE_TRANSACTION_ANALYTICS_SUCCESS:
      return {
        ...state,
        analytics: {
          loader: false,
          error: false,
          ...action.payload
        }
      }
    case transactionTypes.RETRIEVE_TRANSACTION_ANALYTICS_FAILURE:
      return {
        ...state,
        analytics: {
          ...(state.analytics ? state.analytics : {}),
          loader: false,
          error: true
        }
      }
    case transactionTypes.RETRIEVE_TRANSACTION_CHART_START:
      return {
        ...state,
        chart: {
          ...(state.chart ? state.chart : {}),
          loader: true,
        }
      }
    case transactionTypes.RETRIEVE_TRANSACTION_CHART_SUCCESS:
      return {
        ...state,
        chart: {
          loader: false,
          error: false,
          ...action.payload
        }
      }
    case transactionTypes.RETRIEVE_TRANSACTION_CHART_FAILURE:
      return {
        ...state,
        chart: {
          ...(state.chart ? state.chart : {}),
          loader: false,
          error: true
        }
      }

    case transactionTypes.ADD_BASE_TRANSACTION:

      const associatedAccount = action.payload?.accountNo;

      const baseObj = state.transactions?.base?.[associatedAccount];

      const validity = associatedAccount && baseObj;


      return {
        ...state,
        transactions: {
          base: {
            ...state.transactions.base,
            ...(validity ? { [associatedAccount]: [action.payload, ...baseObj] } : {})
          }
        }
      }
    default:
      return state;
  }
};

export default transactionReducer;

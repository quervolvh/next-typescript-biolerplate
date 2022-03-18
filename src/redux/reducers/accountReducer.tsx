import * as accountTypes from 'redux/types/accountTypes';
import { accountType } from 'types';
import { isNumber } from 'utils';

const initialState: accountType = {};

type balanceUpdaterType = { addition?: number, difference?: number, associatedAccount: string };

const balanceUpdater = (action: balanceUpdaterType, state: accountType) => {

  return state?.accountNumber?.map(item => {

    if (item.accountNumber === action?.associatedAccount) {

      const balance = isNumber(item["balance"]) ? Number(item.balance) : 0;

      if (action.difference) {

        item["balance"] = String(balance - action.difference);

      } else if (action.addition) {

        item["balance"] = String(balance + action.addition)

      }

    }

    return item;

  });

}

const accountReducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {

    case accountTypes.GET_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.payload
      };

    case accountTypes.GET_ACCOUNT_NUMBER_SUCCESS:
      return {
        ...state,
        accountNumber: action.payload,
        ...( !state.activeAccountNumber ? { activeAccountNumber : action.payload?.[0]?.accountNumber } : {} )
      }

    case accountTypes.UPDATE_BALANCE:

      const payload: balanceUpdaterType = action.payload;

      return {
        ...state,
        balance: balanceUpdater(payload, state)
      }

    case accountTypes.SET_ACTIVE_ACCOUNT:
      return {
        ...state,
        activeAccountNumber: action.payload
      }
  
    default:
      return state;
  }
};

export default accountReducer;

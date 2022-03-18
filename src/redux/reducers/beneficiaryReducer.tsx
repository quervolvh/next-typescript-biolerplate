import * as beneficiaryTypes from 'redux/types/beneficiaryTypes';
import { beneficiaryType } from 'types';

const initialState = {
  items: []
};

const beneficiaryReducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {
    case beneficiaryTypes.RETRIEVE_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        items: action.payload.map((item: beneficiaryType) =>
        ({
          bank: { Name: item?.bankName, Code: item?.bankCode },
          account: item?.accountNumber,
          firstName: (item?.accountName || "").split(" ")[0],
          lastName: (item?.accountName || "").split(" ")[1],
          ...item
        }))
      };

    case beneficiaryTypes.ADD_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items,
          ...(
            (action?.payload?.bankName && action?.payload?.bankCode && action?.payload?.accountNumber)

              ?

              [{
                bank: { Name: action.payload.bankName, Code: action.payload.bankCode },
                account: action.payload.accountNumber,
                firstName: (action.payload.accountName || "").split(" ")[0],
                lastName: (action.payload.accountName || "").split(" ")[1],
                ...action.payload
              }] : []
          )
        ]
      }

    default:
      return state;
  }
};

export default beneficiaryReducer;

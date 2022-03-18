import * as billTypes from 'redux/types/billTypes';
import { billCategoryType, billContentBlock, billType, recurringBillType, scheduledBillType } from 'types';

const initialState: {
  categories?: { [key: string]: any },
  loader: billContentBlock,
  error: billContentBlock,
  bills: billType[],
  recurring: recurringBillType[],
  scheduled: scheduledBillType[],
} = { loader: {}, error: {}, bills: [], recurring: [], scheduled: [] };

const updateObject = (
  obj: { [key: string]: any },
  field: "categories" | "parent" | "packages" | "recurring" | "scheduled", value: true | false, ref?: string
) => {
  if (!ref) {
    return { ...obj, [field]: value };
  }
  return { ...obj, [field]: { ...(obj[field] || {}), [ref]: value } };
}

const billReducer = (state = initialState, action: { [key: string]: any }) => {
  switch (action.type) {

    case billTypes.RETRIEVE_BILLS_START:
      return {
        ...state,
        loader: updateObject(state.loader, "parent", true),
      }

    case billTypes.RETRIEVE_BILLS_SUCCESS:
      return {
        ...state,
        bills: action.payload,
        loader: updateObject(state.loader, "parent", false),
        error: updateObject(state.loader, "parent", false),
      };

    case billTypes.RETRIEVE_BILLS_FAILURE:
      return {
        ...state,
        loader: updateObject(state.loader, "parent", false),
        error: updateObject(state.loader, "parent", true),
      };

    case billTypes.RETRIEVE_CATEGORY_BILLS_START:
      return {
        ...state,
        loader: updateObject(state.loader, "categories", true, action.payload),
      }

    case billTypes.RETRIEVE_CATEGORY_BILLS_FAILURE:
      return {
        ...state,
        loader: updateObject(state.loader, "categories", false, action?.payload?.ref),
        error: updateObject(state.loader, "categories", true, action?.payload?.ref),
      }

    case billTypes.RETRIEVE_CATEGORY_BILLS_SUCCESS:

      let billCategories = state?.categories || {};
      (action.payload.data || []).forEach((item: billCategoryType) => {
        const category = item?.CategoryId;
        const billId = item?.ID;

        if (billCategories[category]) {

          billCategories[category][billId] = { ...(billCategories[category][billId] || {}), ...item };

        } else billCategories[category] = { [billId]: item };

      })

      return {
        ...state,
        categories: billCategories,
        loader: updateObject(state.loader, "categories", false, action?.payload?.ref),
        error: updateObject(state.loader, "categories", false, action?.payload?.ref),
      };

    case billTypes.RETRIEVE_BILLERS_PRODUCT_START:
      return {
        ...state,
        loader: updateObject(state.loader, "packages", true, action.payload),
      }

    case billTypes.RETRIEVE_BILLERS_PRODUCT_FAILURE:
      return {
        ...state,
        loader: updateObject(state.loader, "packages", false),
        error: updateObject(state.loader, "packages", true),
      }

    case billTypes.RETRIEVE_BILLERS_PRODUCT_SUCCESS:

      let categories = state?.categories || {};
      categories[action.payload?.billerID][action.payload?.categoryID].packages = action.payload.data;

      return {
        ...state,
        categories: categories,
        loader: updateObject(state.loader, "packages", false, action?.payload?.ref),
        error: updateObject(state.loader, "packages", false, action?.payload?.ref),
      };

    case billTypes.PAY_BILL_SUCCESS:
      return state;

    case billTypes.RETRIEVE_RECURRING_BILLS_START:
      return {
        ...state,
        loader: updateObject(state.loader, "recurring", true),
      };

    case billTypes.RETRIEVE_RECURRING_BILLS_SUCCESS:
      return {
        ...state,
        recurring: action.payload,
        loader: updateObject(state.loader, "recurring", false),
        error: updateObject(state.loader, "recurring", false),
      };

    case billTypes.RETRIEVE_RECURRING_BILLS_FAILURE:
      return {
        ...state,
        loader: updateObject(state.loader, "recurring", false),
        error: updateObject(state.loader, "recurring", true),
      };

    case billTypes.CANCEL_RECURRING_BILLS_SUCCESS:
      return {
        ...state,
        recurring: state.recurring.filter((item) => item.id !== action.payload)
      }

    case billTypes.RETRIEVE_SCHEDULED_BILLS_START:
      return {
        ...state,
        loader: updateObject(state.loader, "scheduled", true),
      };

    case billTypes.RETRIEVE_SCHEDULED_BILLS_SUCCESS:
      return {
        ...state,
        scheduled: action.payload,
        loader: updateObject(state.loader, "scheduled", false),
        error: updateObject(state.loader, "scheduled", false),
      };

    case billTypes.RETRIEVE_SCHEDULED_BILLS_FAILURE:
      return {
        ...state,
        loader: updateObject(state.loader, "scheduled", false),
        error: updateObject(state.loader, "scheduled", true),
      };

    case billTypes.CANCEL_SCHEDULED_BILLS_SUCCESS:
      return {
        ...state,
        scheduled: state.scheduled.filter((item) => item.id !== action.payload)
      }

    case billTypes.CREATE_SCHEDULED_BILL_SUCCESS:
      return {
        ...state,
        scheduled: [...state.scheduled, action.payload.data]
      }

    default:
      return state;
  }
};

export default billReducer;

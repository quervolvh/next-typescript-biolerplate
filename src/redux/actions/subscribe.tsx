import axios from "axios";
import { typeOfDispatch } from "redux/store";
import * as subscribeActions from './../types/subscribeTypes';

export const subscribeUser = (email: string): any => async (dispatch: typeOfDispatch) => {

    dispatch({ type: subscribeActions.SUBSCRIBE_START });

    try {

        const { data } = await axios.post("https://api.sendinblue.com/v3/contacts", { email: email, listIds: [0] }, {
            headers: {
                "api-key": process.env.NEXT_PUBLIC_SEND_IN_BLUE_API_KEY,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (data?.id) {
            dispatch({ type: subscribeActions.SUBSCRIBE_SUCCESS });
            return true;
        }

        throw Error("")

    } catch (error: any) {

        dispatch({ type: subscribeActions.SUBSCRIBE_FAILURE });

        if (String(error?.response?.data?.message).includes("already exist")) return "This email address has already been added";

        return 'Unexpected error encountered, please try again later.';

    }

}

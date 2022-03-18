import * as utilTypes from 'redux/types/utilTypes';
import { utilType } from 'types';

const initialState: utilType = {
    cities:
    {
        data: {},
        loader: false,
        error: false
    },
    states:
    {
        data: [],
        loader: false,
        error: false
    },
};

type cityType = {
    state: {
        capital: string,
        name: string,
        id: string,
        locals: { id: string, name: string }[]
    };
}

const utilReducer = (state = initialState, action: { [key: string]: any }) => {

    switch (action.type) {

        case utilTypes.GET_CITIES_START:
            return {
                ...state,
                cities: {
                    ...state.cities,
                    loader: true
                }
            }

        case utilTypes.GET_CITIES_FAILURE:
            return {
                ...state,
                cities: {
                    ...state.cities,
                    loader: false
                }
            }

        case utilTypes.GET_CITIES_SUCCESS:

            const newCity: cityType = action.payload?.[0];

            let currentCities = state.cities.data;

            currentCities[newCity.state.id] = newCity.state.locals;

            return {
                ...state,
                cities: {
                    ...state.cities,
                    data: currentCities,
                    loader: false
                }
            }

        case utilTypes.GET_STATES_START:
            return {
                ...state,
                states: {
                    ...state.states,
                    loader: true
                }
            }

        case utilTypes.GET_STATES_FAILURE:
            return {
                ...state,
                states: {
                    ...state.states,
                    loader: false
                }
            }

        case utilTypes.GET_STATES_SUCCESS:
            return {
                ...state,
                states: {
                    ...state.states,
                    data: action.payload.map((item: { state: string, id: string }) => ({ name: item.state, id: item.id })),
                    loader: false
                }
            }

        default:
            return state;
    }
};

export default utilReducer;
